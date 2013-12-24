(function (root) {
    "use strict";

    var tabs = document.getElementById('tabs'),
        app = document.getElementById('app').style,
        sched = document.getElementById('sched').style,
        canvas = document.getElementById('canvas'),
        download_button = document.getElementById('download_button'),
        add_button = document.getElementById('add_button'),
        days = document.querySelectorAll('.day'),
        plus = document.querySelectorAll('.tab-toggler'),
        headerHeight = document.getElementsByTagName('header')[0].clientHeight,
        i;

    scheda.init('canvas');

    (root.onresize = function(){
        app.height = tabs.style.height=  tabs.style.maxHeight = root.innerHeight - headerHeight + 'px';
        canvas.style.marginTop = ((root.innerHeight - headerHeight) / 2) - (canvas.height / 2) + 'px';
        sched.width = root.innerWidth - tabs.clientWidth - 40 + 'px';
    })();
    
    for (i in days) {
        if (i > -1) {
            days[i].onclick = function () {
                if( (" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf("toggled") > -1 ){
                    this.className = this.className.replace("toggled", "");
                }
                else {
                    this.className += " toggled";
                }
            };
        }
    }
    
    for (i in plus) {
        if ( i > -1) {
            plus[i].onclick = function (e) {
                var id = e.target.attributes.target.value,
                    element = document.getElementById(id);

                if( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf("hidden") > -1 ) {
                    element.className += " expand";
                    e.target.innerHTML = "-";
                    element.parentNode.style.borderLeft = "10px solid #6BBB62";
                    setTimeout(function(){
                        element.className = element.className.replace("hidden", "");
                    }, 1000);
                }
                else {
                    element.parentNode.style.borderLeft = "10px solid #1D1D1D";
                    element.className = element.className.replace("expand", "");
                    element.className += " hidden";
                    e.target.innerHTML = "+";
                }
            };
        }
    }

    download_button.onclick = scheda.downloadSchedule;
    add_button.onclick = function(){
        var courseCode = document.getElementById('course'),
            sectionName = document.getElementById('section'),
            day = document.querySelectorAll('.toggled'),
            _day = "",
            id,
            string,
            i,
            room = document.getElementById('room'),
            time = document.getElementById('from').value +
                    document.getElementById('from2').value +
                    "-" +
                    document.getElementById('to').value +
                    document.getElementById('to2').value;
        
        if (!day.length) {
            alert('Please select atleast 1 day. Thank you.');
            return;
        }

        for (i in day ) {
            if (i > -1) {
                _day += day[i].innerHTML;
                day[i].className = day[i].className.replace("toggled", "");
            }
        }

        id = scheda.drawCourse(_day, time, courseCode.value, sectionName.value, room.value, '#' + document.getElementById('schedBgColor').value);
        string = [courseCode.value, sectionName.value, _day, time, room.value].join(" ");
        
        if (string.length > 24) {
            string = string.substring(0, 21);
            string += "...";
        }
        
        document.getElementById('course_list').innerHTML += "<li>" + string + "<button class='x_button' onclick='scheda.remove(\"" + id + "\");this.parentNode.parentNode.removeChild(this.parentNode);'>X</button></li>";
        room.value = sectionName.value = courseCode.value = "";
    }
    
    root.updateConfig = function (e, p) {
        var obj = {};
        switch ((p = p.split(".")).length) {
        case 1 :    obj[p[0]] = e; break;
        case 2 :    obj[p[0]] = {};
                    obj[p[0]][p[1]] = e;
        }
        scheda.setConfig(obj);
    };

    document.body.onload = function(){
        document.getElementById('bgColor').color.fromString(scheda.getConfig('bgColor').substring(1));
        document.getElementById('headerBgColor').color.fromString(scheda.getConfig('headerBgColor').substring(1));
        document.getElementById('timeBgColor').color.fromString(scheda.getConfig('time.bgColor').substring(1));
        document.getElementById('timeBgColor').color.fromString(scheda.getConfig('time.bgColor').substring(1));
        document.getElementById('miniGridColor').color.fromString(scheda.getConfig('miniGridColor').substring(1));
        document.getElementById('hMainGridColor').color.fromString(scheda.getConfig('hMainGridColor').substring(1));
        document.getElementById('vMainGridColor').color.fromString(scheda.getConfig('vMainGridColor').substring(1));
        document.getElementById('timeColor').color.fromString(scheda.getConfig('time.color').substring(1));
        document.getElementById('dayColor').color.fromString(scheda.getConfig('day.color').substring(1));
        document.getElementById('schedColor').color.fromString(scheda.getConfig('sched.color').substring(1));
    };

}(this));
