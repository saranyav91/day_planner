// a. function to build scheduler Rows (function buildRows) --> loop, moment.js
var times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
var times1 = [9,10,11,12,1,2,3,4,5,6];
function buildRows() {
    // build HTML elements row
    // TODO - finish
    
    showTodaysDate();
    
    var table = $(".table1");


    for (var i = 0; i < times.length; i++) {

        //row.addClass("row");
        table.append("<tr class ='row'>" +
            "<td class ='hour time-block'>" + times[i] + "</td>" +
            "<td><textarea class ="+ "textarea"+i+" id =" + i + "></textarea></td>" +
            "<td><button class='btn saveBtn' id =" + i + "><i class='fa fa-lock'></i></button></td>" +
            "</tr>");

    }
    updateRowStyle();
    if (localStorage != null) {
        keys = Object.keys(localStorage),
            i = keys.length;
        console.log("hi " + i);
        //checkDup();
        console.log("hi printing");
        //while (i--) {
        var event1 = JSON.parse(localStorage.getItem("event"));
        //console.log("hi " + user1.length);
        if (event1 != null){
            var count = 1;
        for (var i = 0; i < event1.length; i++) {
            var temp = event1[i];
            if (temp === null || temp === undefined) { console.log("null object"); }
            else {
                console.log(event1);
                var id = event1[i].id;
                console.log("id" + id);
                var text1 = event1[i].text;
                console.log("text " + text1);
                $("#" + id).text(text1);
            }
        }
    }
}

}

// b. Set date at top of page (function showTodaysDate) --> moment.js
function showTodaysDate() {
    // TODO - finish
    var today = moment(new Date());
    var day = today.toString().split(" ");
    $("#currentDay").text(day[0]+", "+day[1]+" "+day[2]);
}

// c. Save button event handler (function saveRow) --> uses localstorage
function saveRow(id) {
    var text = $("#" + id).val();
    var event = {
        id: id,
        text: text
    };
    // TODO - finish
    var len = Object.keys(localStorage).length;
    console.log("len is " + len);
    var event1 = JSON.parse(localStorage.getItem("event"));
    if (localStorage != null) {


        if (!localStorage.getItem("event")) {
            localStorage.setItem("event", "[]");
        }
        var list = JSON.parse(localStorage.getItem("event"));
        var exist = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == event) {
                exist = true;
                break;
            }
        }
		/*if(!exist) list.push(user);
		else{
			alert("EXIST");
		}*/
        list[list.length] = event;
        list.length++;

        localStorage.setItem("event", JSON.stringify(list));



    }
    else {
        console.log("empty");
        localStorage.setItem("event", JSON.stringify(event));
        console.log(event);
    }

}

// d. Change row styles (function updateRowStyle) --> moment.js
function updateRowStyle() {
    // TODO - finish
    console.log("update row style");
    // i. on page load, check current time (hour) against rows in scheduler
    var time = moment().format("hh:mm:ss a").toString();
    console.log(time);
    var last = time.slice(-2);
    var hrs = time.split(":")[0];
    console.log(("last ")+last);
    if(last=="am"){
        for(var i=3;i<9;i++){
            $("#" + i).css({'background':'#74E96E'});
        }
        for(var i=0;i<3;i++){
            if(hrs>=times1[i] && hrs<times1[i+1]){
                $(".textarea"+i).css({'background':'#F14D57'});
            }
            else if(hrs<times1[i]){
                $(".textarea"+i).css({'background':'#74E96E'});
            }
            else{
                $(".textarea"+i).css({'background':'#CCCCCC'});
            }
        }
    }
    else{
        console.log("in pm");
        
        for(var i=0;i<3;i++){
            console.log($(".textarea" + i));
            $(".textarea"+i).css({'background':'#CCCCCC'});
        }
        for(var i=3;i<9;i++){
            console.log(hrs+" "+times1[i]);
            if(hrs>=times1[i] && hrs<times1[i+1]){
                $(".textarea"+i).css({'background':'#F14D57'});
            }
            else if(hrs<times1[i]){
                $(".textarea"+i).css({'background':'#74E96E'});
            }
            else{
                $(".textarea"+i).css({'background':'#CCCCCC'});
            }
        }
        
    }
    if(hrs==12 && last === "pm"){
        $(".textarea"+3).css({'background':'#F14D57'});  
        for(var i=4;i<9;i++){
            $(".textarea"+i).css({'background':'#74E96E'});
        }
    }
    else if(last === "pm" && hrs<12){
        $(".textarea"+3).css({'background':'#CCCCCC'});
    }
    else if(hrs==12 && last === "am"){
        $("textarea").css({'background':'#74E96E'});
    }
    if(hrs<9 && last === "am"){
        $("textarea").css({'background':'#74E96E'});
    }
    // ii. update style for those that are past hours, present hour, future hours
}

buildRows();
$(".btn").on("click", function () {
    var id = this.id;
    console.log(id);
    saveRow(id);
});