var fullData;
getData();

function getData(){
    var db = new restdb("5cf540711cdaca4633876cd3");
    var query = {}; // get all records
    var hints = {"$max": 10, "$orderby": {"_id": -1}}; // top ten, sort by creation id in descending order
    db.test.find(query, hints, function(err, res){
        if (!err){
            localStorage.setItem("fullData", JSON.stringify(res[0]));
            fullData = res[0];
            console.log(res[0]);
            setup();
        }
    });
}

function setup(){
    var newbox = document.getElementById("news");
    
    for(var i = fullData.nyheder.length-1; i >= 0; i--){
        var header = document.createElement("h3");
        var text = document.createElement("p");
        var img = document.createElement("img");
        
        header.innerHTML = fullData.nyheder[i].overskrift;
        text.innerHTML = fullData.nyheder[i].text;
        text.className = "news"
        
        newbox.appendChild(header);
        newbox.appendChild(text);
        newbox.appendChild(img);
        newbox.appendChild(document.createElement("hr"));
    }
    
    var btns = document.getElementsByClassName("news");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            if(this.className.includes("clicked")){
                var res = this.className.replace(" clicked", "");
                this.className = res;
            }else{
                this.className += " clicked";
            }
        });
    }

    var imgs = document.getElementsByTagName("img");
        var imgs = document.getElementsByTagName("img");
        for(var i = imgs.length-1; i >= 0; i--){
            imgs.item((imgs.length-1)-i).setAttribute("alt", "Billedet kunne ikke findes");
            if(fullData.nyhedbilleder[i] != undefined && fullData.nyhedbilleder[i] != "none"){
                imgs.item((imgs.length-1)-i).setAttribute("src", "https://infomation-93c5.restdb.io/media/"+fullData.nyhedbilleder[i]);
            }else if(fullData.nyhedbilleder[i] == "none"){
                imgs.item((imgs.length-1)-i).setAttribute("alt", "");
            }else{
                imgs.item((imgs.length-1)-i).setAttribute("src", "https://infomation-93c5.restdb.io/media/"+newImgID);
            }
        }
}

