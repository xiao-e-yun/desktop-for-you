console.log("panel settings is load!")

panel.set = function (pan, type, val) { //this = panel
    switch (pan) {
        //==================================時鐘==================================
        case ("clock"):
            let clock = this.clock
            switch (type) {
                case ("type"): //啟用時鐘
                    if (val) {
                        clock.display(true)
                        timer.clock = true;
                    } else {
                        clock.display(false)
                        timer.clock = false;
                    }
                    timer.set()
                    break;
                case ("bg"): //時鐘|背景|類型
                    clock.bg.type = val
                    clock.chg("bg")
                    break;
                case ("bg_blur"): //時鐘|背景|模糊
                    clock.bg.blur = val
                    clock.chg("bg")
                    break;
                case ("bg_blur_opc"): //時鐘|背景|透明
                    clock.bg.opc = (val) / 100
                    clock.chg("bg")
                    break;
                case ("bg_color"): //時鐘|背景|顏色
                    clock.bg.color = get_color(val)
                    clock.chg("bg")
                    break;
                case ("bg_img"): //時鐘|背景|圖片
                    clock.bg.img = "url('file:///" + val + "')"
                    clock.chg("bg")
                    break;

                case ("border"): //邊框開關
                    clock.bor.type = (val ? "" : "none")
                    clock.chg("bor")
                    break;
                case ("border_width"): //時鐘|邊框|長度
                    clock.bor.width = val
                    clock.chg("bor")
                    break;

                case ("border_color"): //時鐘|邊框|顏色
                    clock.bor.color = get_color(val)
                    clock.chg("bor")
                    break;
                case ("border_opacity"): //時鐘|邊框|透明度
                    clock.bor.opc = (val) / 100
                    clock.chg("bor")
                    break;

                case ("pos"): //時鐘位置設置
                    clock.pos.type = val;
                    clock.chg("pos");
                    break;
                case ("pos_pc_x"): //時鐘位置|左右百分比模式
                    clock.pos.pc_x = val + "%";
                    clock.chg("pos");
                    break;
                case ("pos_pc_y"): //時鐘位置|上下百分比模式
                    clock.pos.pc_y = val + "%";
                    clock.chg("pos");
                    break;
                case ("pos_px_x"): //時鐘位置|左右像素模式
                    clock.pos.px_x = val.replace(/[^0-9]/ig, "") + "px";
                    clock.chg("pos");
                    break;
                case ("pos_px_y"): //時鐘位置|上下像素模式
                    clock.pos.px_y = val.replace(/[^0-9]/ig, "") + "px";
                    clock.chg("pos");
                    break;

                case ("twelve_hour"): //時鐘小時格式
                    clock_opt.twelve_hour = val;
                    clock_display()
                    $(".clock_bottom>.AMPM").css({ "display": (clock_opt.twelve_hour ? "" : "none") })
                    timer.set()
                    break;
                case ("show_sec"): //時鐘顯示秒數
                    clock_opt.show_sec = val;
                    clock_display()
                    $(".clock_bottom>.sec").css({ "display": (clock_opt.show_sec ? "" : "none") })
                    timer.set()
                    break;
                case ("size"): //時鐘大小
                    clock.css({
                        "font-size": val + "px",
                        "letter-spacing": Math.round(val * .2) + "px",
                        "padding": "0 " + Math.round(val * .4) + "px"
                    })
                    break;
                case ("color"): //時鐘文字顏色
                    clock.color = get_color(val, true)
                    $("#clock").css({ "color": clock.color })
                    break;
                case ("remind"): //小時提醒
                    clock_opt.remind.type = val
                    clock_remind()
                    break;
                case ("remind_color"): //小時提醒 純色
                    clock_opt.remind.color = get_color(val, true)
                    clock_remind()
                    break;
            }
            //切換時鐘提示類型
            function clock_remind() {
                switch (clock_opt.remind.type) {
                    case ("none"):
                        $("#clock_remind").html("");
                        clock.dom.removeClass("rainbow-bef")
                        break;
                    case ("color"):
                        $("#clock_remind").html("#clock::before{background:" + clock_opt.remind.color + "}");
                        clock.dom.removeClass("rainbow-bef")
                        break;
                    case ("rainbow"):
                        $("#clock_remind").html("");
                        clock.dom.addClass("rainbow-bef")
                        break;
                }
            }
            //切換時鐘顯示模式
            function clock_display() {
                if (clock_opt.twelve_hour == true && clock_opt.show_sec == true) {
                    $(".clock_level").css({ "display": "" })
                    $(".clock_bottom>.clock_break").css({ "display": "" })
                    $(".clock_bottom").css({ "font-size": "" })
                } else {
                    $(".clock_level").css({ "display": "inline" })
                    $(".clock_bottom>.clock_break").css({ "display": "none" })
                    $(".clock_bottom").css({ "font-size": "80%" })
                }
            }
            break;

        //==================================日曆==================================
        case ("cal"):
            let cal = this.cal
            switch (type) {
                case ("type"): //啟用日曆
                    if (val) {
                        cal.display(true)
                        timer.cal = true;
                    } else {
                        cal.display(false)
                        timer.cal = false;
                    }
                    timer.set()
                    break;
                case ("bg"): //日曆|背景|類型
                    cal.bg.type = val
                    cal.chg("bg")
                    break;
                case ("bg_blur"): //日曆|背景|模糊
                    cal.bg.blur = val
                    cal.chg("bg")
                    break;
                case ("bg_blur_opc"): //日曆|背景|透明
                    cal.bg.opc = (val) / 100
                    cal.chg("bg")
                    break;
                case ("bg_color"): //日曆|背景|顏色
                    cal.bg.color = get_color(val)
                    cal.chg("bg")
                    break;
                case ("bg_img"): //日曆|背景|圖片
                    cal.bg.img = "url('file:///" + val + "')"
                    cal.chg("bg")
                    break;

                case ("border"): //日曆|邊框|開關
                    cal.bor.type = (val ? "" : "none")
                    cal.chg("bor")
                    break;
                case ("border_width"): //日曆|邊框|長度
                    cal.bor.width = val
                    cal.chg("bor")
                    break;

                case ("border_color"): //日曆|邊框|顏色
                    cal.bor.color = get_color(val)
                    cal.chg("bor")
                    break;
                case ("border_opacity"): //日曆|邊框|透明度
                    cal.bor.opc = (val) / 100
                    cal.chg("bor")
                    break;

                case ("pos"): //日曆|位置
                    cal.pos.type = val;
                    cal.chg("pos");
                    break;
                case ("pos_pc_x"): //日曆|位置|左右百分比模式
                    cal.pos.pc_x = val + "%";
                    cal.chg("pos");
                    break;
                case ("pos_pc_y"): //日曆|位置|上下百分比模式
                    cal.pos.pc_y = val + "%";
                    cal.chg("pos");
                    break;
                case ("pos_px_x"): //日曆|位置|左右像素模式
                    cal.pos.px_x = val.replace(/[^0-9]/ig, "") + "px";
                    cal.chg("pos");
                    break;
                case ("pos_px_y"): //日曆|位置|上下像素模式
                    cal.pos.px_y = val.replace(/[^0-9]/ig, "") + "px";
                    cal.chg("pos");
                    break;
                case ("size"): //日曆|大小
                    cal.css({
                        "font-size": val + "px",
                        "letter-spacing": Math.round(val * .2) + "px",
                        "padding": "0 " + Math.round(val * .4) + "px"
                    })
                    break;
                case ("color"): //日曆|文字|顏色
                    cal.color = get_color(val, true)
                    cal.css({ "color": cal.color })
                    break;
                case ("show_week"):
                    clock_opt.show_week = val
                    timer.set()
                    cal.dom.find(".week").css("display",val?"":"none")
                    break;
                case ("day_lang"):
                    clock_opt.day.lang = val
                    timer.set()
                    break;
            }

    }
}