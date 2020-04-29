var fullData;
var selected;
var type;
var scoreBoard = document.getElementById("score");
var enheder = ["Bæver", "Ulve", "Junior", "Storspejder", "Senior/Rover"];

function selectType(){
    getData();
    fullData = JSON.parse(localStorage.getItem("fullData"));
    scoreBoard = document.getElementById("score");
    type = document.getElementById("pointType").value;
    if(type == "Løb"){
        selectKat();
    }
    else if(type == "CO2"){
        getData();
        fullData = JSON.parse(localStorage.getItem("fullData"));
        wipe();
        selectKatCO2();
    }
}

function selectKat(){
    var scoreBoard = document.getElementById("score");
    if(scoreBoard.rows[0].cells[1] == null){
        var cell = scoreBoard.rows[0].insertCell(1);
        cell.innerHTML = "Score";
    }
    if(type == "Løb"){
        var selector = document.getElementById("selector");
        selected = selector.options[selector.selectedIndex].text;
        getData();
        fullData = JSON.parse(localStorage.getItem("fullData")).hold;
        if(selected == "Enhed"){
            document.getElementById("selector2").style.visibility = "visible";
            var enhedsSelector = document.getElementById("selector2");

            var length = enhedsSelector.length;
            for(var i = 0; i < length; i++){
                enhedsSelector.remove(0);
            }

            for(var i = 0; i < enheder.length; i++){
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(enheder[i]));
                opt.value = enheder[i];
                enhedsSelector.appendChild(opt);
            }
            selectSpes();
        }else if(selected == "Gruppe"){
            document.getElementById("selector2").style.visibility = "hidden";
            var scoreBoard =  document.getElementById("score");
            document.getElementById("identifier").innerHTML = "Gruppe";

            var grupper = [];
            var grupperScore = [];
            for(var i = 1; i < fullData.length; i++){
                if(!grupper.includes(fullData[i].gruppe)){
                    grupper.push(fullData[i].gruppe);
                }
            }

            for(var i = 0; i < grupper.length; i++){
                var point = 0;
                var gruppeNum = 0;
                for(var u = 0; u < fullData.length; u++){
                    if(grupper[i] == fullData[u].gruppe){
                        point += fullData[u].score;
                        gruppeNum++;
                    }
                }
                point = Math.round(point/gruppeNum);
                grupperScore.push([grupper[i],point]);
                gruppeNum = 0;
            }

            grupperScore.sort(sort2);
            grupperScore.reverse();

            wipe();
            for(var i = 0; i < grupperScore.length; i++){
                var row = scoreBoard.insertRow(scoreBoard.length);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);

                cell1.innerHTML = grupperScore[i][0];
                cell2.innerHTML = grupperScore[i][1];
            }
        }
    }
}
function selectSpes(){
    if(type == "Løb"){
        wipe();
        fullData = JSON.parse(localStorage.getItem("fullData"));
        var enhed = document.getElementById("selector2").value;
        document.getElementById("identifier").innerHTML = enhed;
        var scoreBoard = document.getElementById("score");
        var teamsInUnit = [];
        for(var i = 0; i < fullData.hold.length; i++){
            if(fullData.hold[i].enhed == enhed){
                teamsInUnit.push([fullData.hold[i].name, fullData.hold[i].score]);
            }
        }
        teamsInUnit.sort(sort2);
        teamsInUnit.reverse();

        for(var i = 0; i < teamsInUnit.length; i++){
            var row = scoreBoard.insertRow(scoreBoard.lenth);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell2.innerHTML = teamsInUnit[i][1];
            cell1.innerHTML = teamsInUnit[i][0];
        }
    }
}
function getData(){
    var db = new restdb("5cf540711cdaca4633876cd3");
    var query = {}; // get all records
    var hints = {"$max": 10, "$orderby": {"_id": -1}}; // top ten, sort by creation id in descending order
    db.test.find(query, hints, function(err, res){
        if (!err){
            localStorage.setItem("fullData", JSON.stringify(res[0]));
        }
    });
}
function sort2(a,b){
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
function wipe(){
    var scoreBoard = document.getElementById("score");
    var length = scoreBoard.rows.length;

    for(var i = 0; i< length-1; i++){
        scoreBoard.deleteRow(1);
    }
}

var CO2Poster = ["Affaldssortering", "Alternative metoder", "Anstændige jobs", "Brænde", "Foropgave", "Mad", "Opladning", "Transport metode"];
function selectKatCO2(){
    if(type == "CO2"){
        wipe();
        fullData = JSON.parse(localStorage.getItem("fullData"));
        var scoreBoard = document.getElementById("score");
        scoreBoard.rows[0].deleteCell(1);
        var kat = document.getElementById("selector").value;
        if(kat == "gruppe"){
            document.getElementById("selector2").style.visibility = "hidden";
            scoreBoard.rows[0].cells[0].innerHTML = "Grupper";
            var grupper = [];
            var finalGrupper = [];
            var gruppeScore = [];


            for(var i = 0; i < fullData.hold.length; i++){
                if(!grupper.includes(fullData.hold[i].gruppe)){
                    grupper.push(fullData.hold[i].gruppe);
                }
            }

            for(var i = 0; i < grupper.length; i++){
                var gruppeNum = 0;
                var score = new Array(fullData.hold[0].CO2.length);
                score.fill(0);
                for(var u = 0; u < fullData.hold.length; u++){
                    if(fullData.hold[u].gruppe == grupper[i]){
                        gruppeNum++;
                        for(var j = 0; j < fullData.hold[i].CO2.length; j++){
                            score[j] += parseInt(fullData.hold[u].CO2[j]);
                        }
                    }
                }
                for(var u = 0; u < score.length; u++){
                    score[u] /= gruppeNum;
                }
                gruppeScore.push(score);
                finalGrupper.push([grupper[i],allCO2Point(gruppeScore[i]),score]);
            }
            finalGrupper.sort(sort2);
            finalGrupper.reverse();
            for(var i = 0; i < finalGrupper.length; i++){
                var row = scoreBoard.insertRow(scoreBoard.lenth);
                var collapsibleButton = document.createElement("button");
                collapsibleButton.innerHTML = finalGrupper[i][0] + ": " + finalGrupper[i][1] + " point";                
                collapsibleButton.setAttribute("class", "collapsible");

                var content = document.createElement("div");
                content.setAttribute("class", "content");
                var list = document.createElement("ul");

                for(var u = 0; u < fullData.hold[i].CO2.length; u++){
                    var listElement = document.createElement("li");
                    listElement.innerHTML = CO2Poster[u] + ": " + finalGrupper[i][2][u];
                    list.appendChild(listElement);
                }
                content.appendChild(list);

                row.appendChild(collapsibleButton);
                row.appendChild(content);
            }
            createColls();

        }else if(kat == "enhed"){
            wipe();
            document.getElementById("selector2").style.visibility = "visible";
            scoreBoard.rows[0].cells[0].innerHTML = document.getElementById("selector2").value;

            selectSpesCO2();
        }
    }
}
function selectSpesCO2(){
    if(type == "CO2"){
        fullData = JSON.parse(localStorage.getItem("fullData"));
        var unit = document.getElementById("selector2").value;
        document.getElementById("identifier").innerHTML = unit;
        wipe();
        var data = [];
        for(var i = 0; i < fullData.hold.length; i++){
            if(fullData.hold[i].enhed == unit){
                data.push([fullData.hold[i].name, allCO2Point(fullData.hold[i].CO2), fullData.hold[i].CO2]);
            }
        }
        data.sort(sort2);
        data.reverse();

        for(var i = 0; i < data.length; i++){
            var row = scoreBoard.insertRow(scoreBoard.lenth);
            var collapsibleButton = document.createElement("button");
            collapsibleButton.setAttribute("class", "collapsible");
            collapsibleButton.innerHTML = data[i][0] + ": " + data[i][1] + " point";
            row.appendChild(collapsibleButton);

            var content = document.createElement("div");
            content.setAttribute("class", "content");
            row.appendChild(content);
            var list = document.createElement("ul");
            for(var u = 0; u < fullData.hold[i].CO2.length; u++){
                var listElement = document.createElement("li");
                listElement.innerHTML = CO2Poster[u] + ": " + data[i][2][u];
                list.appendChild(listElement);
            }
            content.appendChild(list);
        }
    }
    createColls();
}
function allCO2Point(points){
    var totalPoints = 0;
    for(var i =0 ; i < points.length; i++){
        totalPoints += points[i];
    }
    return totalPoints;
}
function createColls(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
}

