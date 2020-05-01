var fullData;
//Load beskrivelse og post navn

getData();


function setup(){
    var postIndex = localStorage.getItem("postIndex").split(",");
    postIndex[0] = parseInt(postIndex[0]);
    postIndex[1] = parseInt(postIndex[1]);
    var løbName = fullData.poster[postIndex[0]].name;
    var postName = fullData.poster[postIndex[0]].poster[postIndex[1]][0];
    var postBes = fullData.poster[postIndex[0]].poster[postIndex[1]][2];

    if(document.getElementById("løbName") != undefined){
        document.getElementById("løbName").innerHTML = løbName;
        document.getElementById("postName").innerHTML = postName;
        document.getElementById("postBes").innerHTML = postBes;
    }
}
function givePoint(){
    var point = prompt("Hvor mange point skal holdet have?");
    point = parseInt(point, 10);
    //generate("add,"+point+localStorage.getItem("post"));
    localStorage.setItem("QRText", "add,"+point+localStorage.getItem("post"));
    window.location.href = "adminQR.html";
}

function generate(){/*
    cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, text, function(success) {
        alert("encode success: " + success);
    }, function(fail) {
        alert("encoding failed: " + fail);
    });*/
    var text = localStorage.getItem("QRText");
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : window.innerWidth * 0.7,
        height : window.innerWidth * 0.7
    });
    qrcode.makeCode(text);
}

function findTeam(name){
    fullData = JSON.parse(localStorage.getItem("fullData"));
    for(var i = 0; i < fullData.hold.length; i++){
        if(fullData.hold[i].name == name){
            return(i);
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
            fullData = res[0];
            setup();
        }
    });
}

function loadCheckbox(){
    var i = 0;
    getData();
    fullData = JSON.parse(localStorage.getItem("fullData"));
    var table = document.getElementById('maalTable'),
        rows = table.rows, rowcount = rows.length, r,
        cells, cellcount, c, cell;
    for( r=0; r<rowcount; r++) {
        cells = rows[r].cells;
        cellcount = cells.length;
        for( c=0; c<cellcount; c++) {
            cell = cells[c];
            if(fullData.verdensmaal[i]){
                cell.firstChild.checked = true;
            }
            i++;
        }
    }
}
function updateVerdensmaal(){
    var maal = [];
    $('#maalTable').each(function(){
        $(this).find('th').each(function(){
            //do your stuff, you can use $(this) to get current cell
            maal.push(this.firstChild.checked);
        })
    })
    getData();
    fullData.verdensmaal = maal;
    localStorage.setItem("fullData", JSON.stringify(fullData));
    sendData();
}

function sendData(){
    // Form fields, see IDs above
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://infomation-93c5.restdb.io/rest/test/5cf55c981efbe954000031db');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader("x-apikey", "5cf540711cdaca4633876cd3");
    xhr.send(JSON.stringify(JSON.parse(localStorage.getItem("fullData")))); // Make sure to stringify
}