var login;
var fullData;
var QRScanner;
document.addEventListener("deviceready", start, false);

function start(){   
    getData();
}

function scan(){
    fullData = JSON.parse(localStorage.getItem("fullData"));
    console.log(cordova);
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var res = result.text.split(',');
            if(res[0] == "login"){
                if(findTeam(res[1]) != undefined){
                    document.getElementById("login").innerHTML = "Logget ind som " + res[1];
                    localStorage.setItem("login", res[1]);
                }else{
                    alert("Der må være sket en fejl, det hold findes ikke i databasen");
                }
            }
            if(res[0] == "add"){
                if(login != undefined){
                    console.log(res[2]+ "gjop");
                    addPoint(res[2],res[1]);
                }
            }
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        },{
            resultDisplayDuration: 0,
            disableAnimations: true
        });
    showPoints();
}

function getData(){
    login = localStorage.getItem("login");
    if(login == null){
        document.getElementById("login").innerHTML = "Ikke logget ind";
    }else{
        document.getElementById("login").innerHTML = "Logget ind som " +
            localStorage.getItem("login");
    }

    var db = new restdb("5cf540711cdaca4633876cd3");
    var query = {}; // get all records
    var hints = {"$max": 10, "$orderby": {"_id": -1}}; // top ten, sort by creation id in descending order

    db.test.find(query, hints, function(err, res){
        if (!err){
            localStorage.setItem("fullData", JSON.stringify(res[0]));
            fullData = localStorage.getItem("fullData");
        }
    });
    showPoints();
}

function findTeam(name){
    var fullData = JSON.parse(localStorage.getItem("fullData"));
    for(var i = 0; i < fullData.hold.length; i++){
        if(fullData.hold[i].name == name){
            return(i);
        }
    }
}

function sendData(){
    console.log("sender1");
    // Form fields, see IDs above
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://infomation-93c5.restdb.io/rest/test/5cf55c981efbe954000031db');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader("x-apikey", "5cf540711cdaca4633876cd3");
    xhr.send(JSON.stringify(fullData)) // Make sure to stringify
    console.log("sender2");
}

function addPoint(post, point){
    getData();
    point = parseInt(point);
    if(!isNaN(point)){
        fullData.hold[findTeam(login)].score += point;
        var his = new Array([post, point]);
        console.log(fullData.hold[findTeam(login)].historik);
        //fullData.hold[findTeam(login)].historik.push(his);
        localStorage.setItem("fullData", JSON.stringify(fullData));
        showPoints();
        sendData();
    }
}

function showPoints(){
    fullData = JSON.parse(localStorage.getItem("fullData"));
    document.getElementById("point").innerHTML = "Din gruppe har " + fullData.hold[findTeam(login)].score + " point";
}