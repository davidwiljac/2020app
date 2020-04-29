var fullData;
function getData(){
    var db = new restdb("5cf540711cdaca4633876cd3");
    var query = {}; // get all records
    var hints = {"$max": 10, "$orderby": {"_id": -1}}; // top ten, sort by creation id in descending order
    db.test.find(query, hints, function(err, res){
        if (!err){
            localStorage.setItem("fullData", JSON.stringify(res[0]));
            fullData = res[0];
            setStatus();
        }
    });
}

var opened = false;
var lastEle;
function displayText(ele){

    if(opened){
        opened = false;
    }else{
        opened = true;
    }

    if(!opened && ele.id != lastEle){
        var timer = setTimeout(function(){
            document.getElementById(lastEle).click();
            setText(ele);
            lastEle = ele.id;
            document.getElementById(lastEle).click();
            document.getElementById(lastEle).click();
        },200);
    }else{
        setText(ele);
        lastEle = ele.id;
    }
}

function setText(ele){
    var text = document.createElement("p"); 
    var div = ele.closest('div').nextElementSibling;
    div.innerHTML = "";
    if(ele.id == "maal1"){
        text.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis convallis eros, non dignissim massa condimentum vitae. Nam eu pulvinar odio, ut euismod lacus. Vivamus volutpat tincidunt bibendum. Suspendisse nibh urna, congue vitae ante eget, elementum mattis libero. Quisque sodales orci id pharetra consequat. Praesent vulputate vehicula maximus. Vestibulum tincidunt luctus enim ultricies dapibus. In convallis a orci at malesuada. Mauris lacinia nunc cursus, malesuada quam at, rutrum ligula. Sed venenatis dui ac tristique consectetur. Etiam id erat luctus, maximus velit non, dapibus ligula.";
    }
    if(ele.id == "maal2"){
        text.innerHTML = "Pellentesque tristique eu lectus quis porta. Quisque in lacus lorem. Sed imperdiet bibendum nunc porta luctus. Phasellus eu bibendum libero. Nunc pulvinar quam diam, quis interdum lectus euismod at. Nam viverra lacinia urna, et porttitor dui tincidunt eget. Sed erat dolor, congue ac accumsan eu, rutrum eu est. Praesent et augue eros. Etiam elementum pellentesque mi nec molestie. Sed bibendum et nibh ut auctor. Pellentesque eu dui ut enim ornare porta. Phasellus congue fringilla felis, at pulvinar justo molestie eu. Cras vestibulum ipsum ac enim luctus, eu vestibulum est vestibulum. Curabitur at erat turpis.";
    }
    if(ele.id == "maal3"){
        text.innerHTML = "tester3";
    }
    if(ele.id == "maal4"){
        text.innerHTML = "tester4";
    }
    if(ele.id == "maal5"){
        text.innerHTML = "tester5";
    }
    if(ele.id == "maal6"){
        text.innerHTML = "tester6";
    }
    if(ele.id == "maal7"){
        text.innerHTML = "tester7";
    }
    if(ele.id == "maal8"){
        text.innerHTML = "tester8";
    }
    if(ele.id == "maal9"){
        text.innerHTML = "tester9";
    }
    if(ele.id == "maal10"){
        text.innerHTML = "tester10";
    }
    if(ele.id == "maal11"){
        text.innerHTML = "tester11";
    }
    if(ele.id == "maal12"){
        text.innerHTML = "tester12";
    }
    if(ele.id == "maal13"){
        text.innerHTML = "tester13";
    }
    if(ele.id == "maal14"){
        text.innerHTML = "tester14";
    }
    if(ele.id == "maal15"){
        text.innerHTML = "tester15";
    }
    if(ele.id == "maal16"){
        text.innerHTML = "tester16";
    }
    if(ele.id == "maal17"){
        text.innerHTML = "tester17";
    }
    div.appendChild(text);
}

function setStatus(){
    for(var i = 0; i<17;i++){
        if(fullData.verdensmaal[i]){
            var path = "verdensmaal_billeder/"+(i+1)+"_2.png";
            document.getElementById("maal"+(i+1)).setAttribute("src", path);
        }
    }
}

function stopTimer(){
    clearTimeout()
}