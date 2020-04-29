var fullData;
var program = "";
var unitIndex = 0;
var day = 0;
function getData(){
    var db = new restdb("5cf540711cdaca4633876cd3");
    var query = {}; // get all records
    var hints = {"$max": 10, "$orderby": {"_id": -1}}; // top ten, sort by creation id in descending order
    db.test.find(query, hints, function(err, res){
        if (!err){
            localStorage.setItem("fullData", JSON.stringify(res[0]));
            fullData = res[0];
            program = fullData.program[day][unitIndex];
            console.log("hej");
            setup();
        }
    });
}



//var program = [[],[],[],[],[],[],["hej", 5],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var state;
var mouseDown = false;
var colIndex;
var col = ["#ff0000", "#fa8072", "#ffd700", "#ffa500", "#ffff00", "#F0E68C", "#008000", "#00FF00", "#00FFFF", "#40E0D0", "#0000FF", "#000080", "#FFC0CB", "#808080", "#FFF8DC"];

function setup(){
    document.getElementById("loader").innerHTML = "";
    for(var i = 0; i < 35; i++){
        var tidsbox = document.createElement("div");
        tidsbox.className = "tidsbox";
        tidsbox.id = i;
        if(program[i][0] != undefined){
            if(i == 0){
                tidsbox.innerHTML = program[0][0];
            }
            else if(program[i][0] != program[i-1][0]){
                tidsbox.innerHTML = program[i][0];
            }
        }
        tidsbox.style.backgroundColor = col[program[i][colIndex]];

        document.getElementById("tidsplan").appendChild(tidsbox);
    }
    update();
}

function update(){
    for(var i = 0; i < 35; i++){
        var tidsbox = document.getElementById(i);

        try {
            if(i == 0 && program[i][0] != undefined){
                tidsbox.innerHTML = program[0][0];
                tidsbox.style.backgroundColor = col[program[0][1]];
            }else if((program[i][0] != program[i-1][0] || program[i][1] != program[i-1][1]) && program[i][0] != undefined){
                tidsbox.innerHTML = program[i][0];
                tidsbox.style.backgroundColor = col[program[i][1]];
            }else{
                tidsbox.innerHTML = "";
                tidsbox.style.backgroundColor = "";
            }
        } catch (e) {
            //Catch Statement
        }
        tidsbox.style.backgroundColor = col[program[i][1]];
    }
}

function changeUnit(){
    unitIndex = document.getElementById("unit").selectedIndex;
    document.getElementById("tidsplan").innerHTML = "";
    getData();
    update();
    //console.log(document.getElementById("unit").selectedIndex);
}

function changeDay(){
    day = document.getElementById("day").selectedIndex;
    document.getElementById("tidsplan").innerHTML = "";
    getData();
    update();
}

