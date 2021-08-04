console.log("panel settings is load!")

panel.set = function (this: typeof panel, pan, type, val) { //this = panel
    let $pan = this[pan] as Panel
    //=================================================================
    //                              基本面板設置
    //=================================================================
    switch (type) {
        case ("type"): //啟用面板
            $pan.display(val)
            break;
        case ("bg"): //面板|背景|類型
            $pan.bg.type = val
            $pan.chg("bg")
            break;
        case ("bg_blur"): //面板|背景|模糊
            $pan.bg.blur = val
            $pan.chg("bg")
            break;
        case ("bg_blur_opc"): //面板|背景|透明
            $pan.bg.opc = (val) / 100
            $pan.chg("bg")
            break;
        case ("bg_color"): //面板|背景|顏色
            $pan.bg.color = get_color(val)
            $pan.chg("bg")
            break;
        case ("bg_img"): //面板|背景|圖片
            $pan.bg.img = "url('file:///" + val + "')"
            $pan.chg("bg")
            break;

        case ("border"): //面板|邊框|開關
            $pan.bor.type = (val ? "" : "none")
            $pan.chg("bor")
            break;
        case ("border_width"): //面板|邊框|長度
            $pan.bor.width = val
            $pan.chg("bor")
            break;

        case ("border_color"): //面板|邊框|顏色
            $pan.bor.color = get_color(val)
            $pan.chg("bor")
            break;
        case ("border_opacity"): //面板|邊框|透明度
            $pan.bor.opc = (val) / 100
            $pan.chg("bor")
            break;

        case ("pos"): //面板位置設置
            $pan.pos.type = val;
            $pan.chg("pos");
            break;
        case ("pos_pc_x"): //面板位置|左右百分比模式
            $pan.pos.pc_x = val + "%";
            $pan.chg("pos");
            break;
        case ("pos_pc_y"): //面板位置|上下百分比模式
            $pan.pos.pc_y = val + "%";
            $pan.chg("pos");
            break;
        case ("pos_px_x"): //面板位置|左右像素模式
            $pan.pos.px_x = val.replace(/[^0-9]/ig, "") + "px";
            $pan.chg("pos");
            break;
        case ("pos_px_y"): //面板位置|上下像素模式
            $pan.pos.px_y = val.replace(/[^0-9]/ig, "") + "px";
            $pan.chg("pos");
            break;
        case ("size"): //面板大小
            $pan.css({
                "font-size": val + "px",
                "letter-spacing": Math.round(val * .2) + "px",
                "padding": "0 " + Math.round(val * .4) + "px"
            })
            break;
        case ("color"): //面板文字顏色
            $pan.color = get_color(val, true)
            $pan.css({ "color": $pan.color })
            break;
        case ("shadow_blur"):
            $pan.shadow.blur = val
            shadow_set()
            break;
        case ("shadow_size"):
            $pan.shadow.size = val
            shadow_set()
            break;
        case ("shadow_type"):
            $pan.shadow.type = val
            shadow_set()
            break;
        case ("shadow"):
            $pan.shadow.color = get_color(val, true)
            shadow_set()
            break;

        }
        function shadow_set(){
            let $css:any
            if($pan.shadow.type === "drop_shadow"){
                // $pan.shadow.size 在drop-shadow不工作
                $css = {
                    "filter": "drop-shadow(0 0 " + $pan.shadow.blur + "px " + $pan.shadow.color + ")",
                    "box-shadow": "none"
                }
            }else{//box_shadow
                $css = {
                    "filter": "none",
                    "box-shadow": "0 0 " + $pan.shadow.blur + "px " + $pan.shadow.size + "px " + $pan.shadow.color 
                }
            }
            $pan.css($css)
        }

    //=================================================================
    //                           特定呼叫
    //=================================================================

    switch (pan) {
        //==================================時鐘==================================
        case ("clock"):
            const clock = this.clock
            switch (type) {
                case ("type"): //啟用時鐘
                    timer["clock"] = val;
                    timer.set()
                    break;
                case ("remind"): //小時提醒
                    clock_opt.remind.type = val
                    clock_remind()
                    break;
                case ("remind_color"): //小時提醒 純色
                    clock_opt.remind.color = get_color(val, true)
                    clock_remind()
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
            const cal = this.cal
            switch (type) {
                case ("type"): //啟用日曆
                    timer["cal"] = val;
                    timer.set()
                    break;
                case ("show_week"):
                    clock_opt.show_week = val
                    timer.set()
                    cal.dom.find(".week").css("display", val ? "" : "none")
                    break;
                case ("day_lang"):
                    clock_opt.day.lang = val
                    timer.set()
                    break;
            }
            break;
        case ("logo"):
            const logo = this.logo
            switch (type) {
                case ("image"):
                    const html = /*html*/`<img src="file:///${val}"/>`
                    logo.dom.html(html)
                    break;
                case ("image_size"):
                    logo.dom.children().css({ "width": val + "%", "height": val + "%" })
            }
            break;
    }

}