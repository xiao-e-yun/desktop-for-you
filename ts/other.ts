console.log("other settings is load!")
var timer = {
    type: false,
    run_time: 0,
    set: function () {
        if (this.cal || this.clock) {
            this.run(true);
            if (this.type == false) {
                this.type = true
                this.sys = setInterval(this.run, 500)
            }
        } else {
            if (this.type == true) {
                clearInterval(this.sys);
            }
            this.type = false
        }
    },
    run: function (opt = false) { // 運行定時器
        var time = new Date();

        if (timer["clock"]) {//時鐘
            var $clock = panel.clock.dom
            var setting = clock_opt.time
            setting.new_sec = time.getSeconds()


            function clock_remind() {//小時提醒
                if (clock_opt.remind.run != true) {
                    clock_opt.remind.run = true
                    $clock.addClass("clock-remind")
                    setTimeout(() => {
                        $clock.removeClass("clock-remind")
                    }, 5000
                    )
                }
            }

            //運行
            if (setting.new_sec != setting.sec) { //更新秒
                setting.sec = setting.new_sec
                if(clock_opt.show_sec){
                $clock.find(".sec").text(setting.sec.toString().padStart(2, "0"));
                }
            }
            if (setting.sec == 0) { //更新分
                setting.min = time.getMinutes()
                $clock.find(".min").text(setting.min.toString().padStart(2, "0"));
            }
            if (setting.min == 0 && setting.sec == 0) { //更新小時
                if (clock_opt.remind.type != "none") { //顯示小時提醒
                    clock_remind()
                }
                setting.hr = time.getHours()
                twelve_hr()
                $clock.find(".hr").text(setting.hr.toString().padStart(2, "0"));
            }
        }

        if (timer["cal"]) {
            if (timer.run_time % 20 == 0) {
                let new_date = time.getDate() //日

                if (new_date != clock_opt.time.date) {//新的一天
                    let $date = $(".date") //dom

                    $date.find(".d").text(new_date.toString().padStart(2, "0"))
                    clock_opt.time.date = new_date

                    if(clock_opt.show_week){$(".week").html(get_day());}

                    if (clock_opt.time.date == 1) {//每個月第一天
                        let new_mon = time.getMonth() + 1

                        if (clock_opt.time.mon != new_mon) {//第一天相同

                            $date.find(".m").text(new_mon.toString().padStart(2, "0"))
                            clock_opt.time.mon = new_mon
                        }
                    }
                }
            }
        }

        if (timer.run_time == 1200 || opt) { //十分鐘糾錯 & 首次運行
            if (timer["cal"]){reload_cal();}
            if (timer["clock"]){reload_clock();}
        }
        
        function twelve_hr() { //十二小時制
            if (clock_opt.twelve_hour) {
                //12小時制
                if (setting.hr <= 12 && setting.hr != 0) {
                    //AM
                    if (setting.AM_PM != "AM") {
                        setting.AM_PM = "AM";
                    }
                } else {
                    //PM
                    if (setting.AM_PM != "PM") {
                        setting.AM_PM = "PM";
                    }
                    if (setting.hr == 0) {
                        setting.hr += 12;
                    } else {
                        setting.hr -= 12;
                    }
                }
            } else {
                //24小時制
                setting.hr == 0 ? 24 : setting.hr;
            }
            $clock.find(".AMPM").text(setting.AM_PM);
        }
        
        function reload_clock() { //重置時間
            setting.sec = setting.new_sec
            setting.hr = time.getHours()
            setting.min = time.getMinutes()
            twelve_hr()
            $clock.find(".hr").text(setting.hr.toString().padStart(2, "0"));
            $clock.find(".min").text(setting.min.toString().padStart(2, "0"));
            $clock.find(".sec").text(setting.sec.toString().padStart(2, "0"));
        }

        function reload_cal() { //重置日曆
            let $date = $(".date") //dom
            let new_mon = time.getMonth() + 1 //月
            let new_date = time.getDate() //日
            $date.find(".m").text(new_mon.toString().padStart(2, "0")) //寫入月
            $date.find(".d").text(new_date.toString().padStart(2, "0")) //寫入日
            $(".week").html(get_day());//寫入星期
            clock_opt.time.mon = new_mon //存月變數
            clock_opt.time.date = new_date; //存日變數
        }

        function get_day(){ //讀取星期
            return clock_opt.day[clock_opt.day.lang][time.getDay()]
        }

        timer.run_time = (timer.run_time == 1200 ? 0 : timer.run_time + 1)

    }
}