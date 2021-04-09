﻿//==================================變數==================================
window.bg = {}
//特效設定
window.fx = {
    fps: {
        fixed: 0,
        last: performance.now() / 1000,
        fpsThreshold: 0,
        run: function () {
            // 刷新畫面
            window.requestAnimationFrame(fx.fps.run);
            // 計算時差
            var now = performance.now() / 1000;
            var dt = now - fx.fps.last;
            fx.fps.last = now;
            // FPS LIMIT IMPLEMENTATION HERE
            // If there is an FPS limit, abort updating the animation if we reached the desired FPS
            if (fx.fps.fixed > 0) {
                fx.fps.fpsThreshold += dt;
                if (fx.fps.fpsThreshold < 1.0 / fx.fps.fixed) {
                    return;
                }
                fx.fps.fpsThreshold -= 1.0 / fx.fps.fixed;
            }
            //
            if (bg.type == "video") {$("canvas").css("display","none")}else{
                $("canvas").css("display","")
                if (typeof (animate) == "function" && fx.sakura.type ) { animate() }
            }
        }
    },
    sakura: {//櫻花
        chg_opc: function () {
            if (window.fx.sakura.tmp) {
                $("#sakura").css("opacity", 1 - this.opacity / 100)
            }
        }
    }
}
//時鐘設定
window.clock_opt = {
    time: {
        AM_PM: "",
        mon: "",
    },
    remind: {
        run: false,
    },
    day: {
        zh: [ //中文
            "日", "一", "二", "三", "四", "五", "六"
        ],
        us: [ //英文縮寫
            "&nbsp;Sun", "&nbsp;Mon", "Tues", "&nbsp;Wed", "Thur", "&nbsp;Fri", "&nbsp;Sat"
        ]
    }
}
//==================================面板==================================
window.panel = {
    RegExp: /panel_(?<panel>.*)\$(?<type>.*)$/gm,
    creat: function (_id) {
        this[_id] = {
            id: _id, //ID
            dom: $("#" + _id), //dom
            bg: {}, //背景
            bor: {}, //邊框
            pos: {}, //位置
            display: function (bool) {//顯示模式
                this.dom[bool ? "fadeIn" : "fadeOut"]()
            },
            css: function (set) {//修改css
                this.dom.css(set)
            },
            chg: function (type) {  // 修改背景類型
                switch (type) {
                    case ("bg"):
                        if (this.bg.type == "color") { //純色
                            this.css({
                                "backdrop-filter": "blur(" + this.bg.blur + "px)",
                                "background-image": "",
                                "background-color": to_rgba(this.bg.color, this.bg.opc)
                            })
                        } else if (this.bg.type == "img") { //圖片
                            this.css({
                                "backdrop-filter": "blur(" + this.bg.blur + "px)",
                                "background-image": this.bg.img,
                                "background-color": ""
                            })
                        }
                        break;
                    case ("bor"):
                        this.css({
                            "border": this.bor.type,
                            "border-width": this.bor.width,
                            "border-color": to_rgba(this.bor.color, this.bor.opc)
                        })
                        break;
                    case ("pos"):
                        if (this.pos.type == "pc") { //百分比模式 PerCentage
                            this.css({
                                "left": this.pos.pc_x,
                                "bottom": this.pos.pc_y,
                            })
                        } else if (this.pos.type == "px") { //像素模式 PiXel
                            this.css({
                                "left": this.pos.px_x,
                                "bottom": this.pos.px_y,
                            })
                        }
                        break;
                }
            }
        }
    },
};
$(() => {
    window.requestAnimationFrame(fx.fps.run);
    //================================創建面板================================
    panel.creat("clock") //時鐘
    panel.creat("cal") //日曆
    //==================================監聽==================================
    window.wallpaperPropertyListener = {
        //▲-------------------------監聽暫停-------------------------▲
        setPaused: function (isPaused) {
            if (!isPaused) {//重新啟動
                timer.set()
            } else { //已暫停

            }
        },
        //▲-------------------------監聽系統設定-------------------------▲
        applyGeneralProperties: function (setting) {
            if (setting.fps) {
                fx.fps.fixed = setting.fps;
            }

        },
        //▲-------------------------監聽用戶設定-------------------------▲
        applyUserProperties: function (user) {
            //==================================背景==================================

            body = $("body")

            function change_bg() {
                body.css({
                    "background-image": "",
                    "background-color": ""
                })
                if (bg.video_tmp) {
                    $("#bg_video").remove()
                    bg.video_tmp = false
                }
                switch (bg.type) {
                    case ("color"):
                        body.css({
                            "background-color": bg.color
                        })
                        break;
                    case ("image"):
                        body.css({
                            "background-image": "url('" + (
                                (bg.img_type == "file") ?
                                    bg.img_file :
                                    bg.img_url
                            ) + "')"
                        })
                        break;
                    case ("video"):
                        if (bg.video_file) {
                            if (!bg.video_tmp) {
                                $("body").append("<video id=\"bg_video\" src=\"\" loop autoplay></video>")
                                bg.video_tmp = true
                            }
                            $("#bg_video")[0].src = "file:///" + bg.video_file
                        }
                        break;
                    case ("bing_api"):
                        $.getJSON("https://bing.biturl.top/", (json) => {
                            body.css({
                                "background-image": "url('" + json.url + "')"
                            })
                        })
                        break;
                }
            }
            if (user.background_type) {
                bg.type = user.background_type.value
                change_bg()
            }
            if (user.background_color) {
                bg.color = get_color(user.background_color.value, true)
                change_bg()
            }
            if (user.background_image_type) {
                bg.img_type = user.background_image_type.value
                change_bg()
            }
            if (user.background_image_file) {
                let val = user.background_image_file.value
                bg.img_file = (val == "") ? ("background.webp") : ("file:///" + val)
                change_bg()
            }
            if (user.background_image_url) {
                let val = user.background_image_url.value
                if (val.indexOf("https://") === -1 && val.indexOf("http://") === -1) {
                    val = "https://" + val
                }
                bg.img_url = val
                change_bg()
            }
            if (user.background_video_file) {
                bg.video_file = unescape(user.background_video_file.value)
                change_bg()
            }
            if (user.background_size) {
                body.css({ "background-size": user.background_size.value })
            }
            //==================================特效==================================
            if (user.fx_sakura$type) {
                let val = user.fx_sakura$type.value
                if (!fx.sakura.tmp) {
                    if (val) {
                        $.get("sakura/shader.html", (data) => {
                            $("body").append(data)
                            sakura_onload()
                        })
                        window.fx.sakura.tmp = true
                    }
                }
                window.fx.sakura.type = val
                $("#sakura")[val ? 'fadeIn' : 'fadeOut']();
                fx.sakura.chg_opc()
            }
            if (user.fx_sakura$opc) {
                window.fx.sakura.opacity = user.fx_sakura$opc.value
                fx.sakura.chg_opc()
            }
            //==================================面板==================================
            for (const [$key, $val] of Object.entries(user)) {
                if ($key.indexOf("panel_") === 0) {//驗證是否為面板
                    let key = panel.RegExp.exec($key).groups
                    let val = $val.value
                    panel.RegExp.lastIndex = 0;
                    panel.set(key.panel, key.type, val)
                }
            }
        }
    };
})
//==================================函式==================================

//讀取顏色
function get_color(data, type = false) {
    let color = data.split(' ');
    if (type) { //轉RGB格式
        return 'rgb(' + color.map(function (c) { return Math.ceil(c * 255) }) + ')';
    } else { //轉數組
        return color.map(function (c) { return Math.ceil(c * 255) });
    }
}

//顏色+透明度 => RGBA
function to_rgba(color, opacity) {
    return "rgba(" + color + "," + opacity + ")"
}