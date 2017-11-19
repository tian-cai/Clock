(function(){
    var canvasDom , context, width , height, r, hourColor, minuteColor, secondColor, clockBorderColor, dateColor, numberColor, dotColor, dotIntColor, dotOfhmsColor;
    var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2], rate = 1 / 20;
    var convertWeekDay = {
        0: '天',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
    }
    //绘制表盘
    function drawClockBackground() {
        context.save();
        context.translate(width / 2, height / 2);
        context.beginPath();
        //绘制表盘边框
        context.lineWidth = width * rate;
        context.arc(0, 0, r - width * rate / 2, 0, 2 * Math.PI);
        context.strokeStyle = clockBorderColor;
        context.stroke();
        //绘制表盘数字
        var rad, x, y;
        context.font = width * rate / 20 * 29 + '' + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = numberColor;
        hours.forEach(function(element, index, array) {
            rad = 2 * Math.PI / 12 * index;
            x = Math.cos(rad) * (r - width * rate * 2.2);
            y = Math.sin(rad) * (r - width * rate * 2.2);
            context.fillText(element, x, y);
        })
        //绘制数字旁边的点
        for (var i = 0; i < 60; i++) {
            rad = 2 * Math.PI / 60 * i;
            x = Math.cos(rad) * (r - width * rate / 20 * 26);
            y = Math.sin(rad) * (r - width * rate / 20 * 26);
            context.beginPath();
            if (i % 5 === 0) {
                context.fillStyle = dotIntColor;
            } else {
                context.fillStyle = dotColor;
            }
            context.arc(x, y, width * rate / 5, 0, 2 * Math.PI);
            context.fill();
        }
    }

    //绘制时针
    function drawClockHour(hour, minute) {
        context.save();
        var rad;
        rad = 2 * Math.PI / 12 * hour + 2 * Math.PI / 12 / 60 * minute;
        context.beginPath();
        context.rotate(rad);
        context.lineCap = 'round';
        context.lineWidth = width * rate / 20 * 10;
        context.moveTo(-width * rate / 20 * 8, width * rate / 20 * 14);
        context.lineTo(width * rate / 20 * 8, width * rate / 20 * 14);
        context.lineTo(width * rate / 20 * 3, -r / 2);
        context.lineTo(-width * rate / 20 * 3, -r / 2);
        context.fillStyle = hourColor;
        context.fill();
        context.restore();
    }

    //绘制分针
    function drawClockMinute(minute, second) {
        context.save();
        var rad;
        rad = 2 * Math.PI / 60 * minute + 2 * Math.PI / 60 / 60 * second;
        context.beginPath();
        context.rotate(rad);
        context.lineCap = 'round';
        context.lineWidth = width * rate / 20 * 6;
        context.moveTo(-width * rate / 20 * 6, width * rate / 20 * 20);
        context.lineTo(width * rate / 20 * 6, width * rate / 20 * 20);
        context.lineTo(width * rate / 20 * 2, -r * 3 / 4);
        context.lineTo(-width * rate / 20 * 2, -r * 3 / 4);
        context.fillStyle = minuteColor;
        context.fill();
        context.restore();
    }

    //绘制秒针
    function drawClockSecond(second) {
        context.save();
        context.fillStyle = secondColor;
        var rad;
        rad = 2 * Math.PI / 60 * second;
        context.beginPath();
        context.rotate(rad);
        context.lineCap = 'round';
        context.lineWidth = width * rate / 20 * 4;
        context.moveTo(-width * rate / 5, width * rate / 20 * 24);
        context.lineTo(width * rate / 5, width * rate / 20 * 24);
        context.lineTo(width * rate / 20, -r / 6 * 5);
        context.lineTo(-width * rate / 20, -r / 6 * 5);
        context.fill();
        context.restore();
    }

    //绘制时针分针秒针交织点
    function drawClockDot() {
        context.beginPath();
        context.fillStyle = dotOfhmsColor;
        context.arc(0, 0, width * rate / 5, 0, 2 * Math.PI);
        context.fill();
    }

    //绘制中文说明现在的时间
    function drawClockTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var weekDay = date.getDay();
        weekDay = '星期' + convertWeekDay[weekDay];
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        context.save();
        context.font = width * rate / 20 * 22 + '' + 'px Arial';
        context.fillStyle = dateColor;
        context.fillText(year + '年' + month + '月' + day + '日' + ' ' + weekDay, 0, r / 5 * 1.1);
        context.fillText(hour+':'+minute+':'+second, 0, r / 5 * 1.9);
        context.restore();
    }

    //绘制整个时钟
    function drawClock () {
        context.clearRect(0, 0, width, height);
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        drawClockBackground();
        drawClockHour(hour, minute);
        drawClockMinute(minute, second);
        drawClockSecond(second);
        drawClockDot();
        drawClockTime(date);
        context.restore();
    }

    //拖拽时钟
    function dragClock(e) {
        var e = e || window.event;
        e.preventDefault()
        e.stopPropagation()
        //canvas距离浏览器左上角的距离
        var canvasDomLeft = canvasDom.offsetLeft;
        var canvasDomTop = canvasDom.offsetTop;
        //鼠标距离canvas左上角的距离
        var left = e.clientX - canvasDomLeft;
        var top = e.clientY - canvasDomTop;
        var leftMax = window.innerWidth - width;
        var topMax = window.innerHeight - height;
        canvasDom.onmousemove = function(e) {
            var event = e || window.event;
            var nowTop = event.clientY - top;
            var nowLeft = event.clientX - left;
            if (nowTop < 0) {
                nowTop = 0;
            }
            if (nowTop > topMax) {
                nowTop = topMax;
            }
            if (nowLeft > leftMax) {
                nowLeft = leftMax;
            }
            if (nowLeft < 0) {
                nowLeft = 0;
            }
            canvasDom.style.top = nowTop + 'px';
            canvasDom.style.left = nowLeft + 'px';
        }
        canvasDom.onmouseleave = function(e) {
            canvasDom.onmousemove = null;
        }
        canvasDom.onmouseup = function(e) {
            canvasDom.onmousemove = null;
        }
    }

    //对外抛出的时钟构造函数，可配置化
    function Clock(options) {
        canvasDom = document.getElementById(options.id);
        canvasDom.style.position = 'fixed';
        canvasDom.style.zIndex = '9999';
        context = canvasDom.getContext('2d');
        width = canvasDom.width;
        height = canvasDom.height;
        r = width / 2;
        hourColor = options.hourColor || '#4C3FFC';  //时针颜色
        minuteColor = options.minuteColor || '#5073FF'; //分针颜色
        secondColor = options.secondColor || 'red';  //秒针颜色
        clockBorderColor = options.clockBorderColor || '#BAC8FC';  //时钟边框颜色
        dateColor = options.dateColor || '#8299FF';  // 日期颜色
        numberColor = options.numberColor || '#1905C9';  //时钟表盘数字颜色
        dotOfhmsColor =  options.dotOfhmsColor || '#fff';  //时针分针秒针交织点颜色
        dotColor = options.dotColor || '#ccc'; //表盘数字旁边点的颜色
        dotIntColor = options.dotIntColor || '#01071F';  //表盘数字旁边整点的颜色
        drawClock();
        setInterval(drawClock, 1000);
        canvasDom.addEventListener('mousedown',dragClock)
    }
    window.Clock = Clock;
    
})()