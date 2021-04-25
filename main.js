/// <reference path="other.ts"/>
/// <reference path="panel.ts"/>
/// <reference path="sakura/main.js"/>
bg = {};
//特效設定
fx = {
    fps: {
        fixed: 0,
        last: performance.now() / 1000,
        fpsThreshold: 0,
        run: function () {
            // 刷新畫面
            fx.fps.req = window.requestAnimationFrame(fx.fps.run);
            // 計算時差
            var now = performance.now() / 1000; // 
            var dt = now - fx.fps.last;
            fx.fps.last = now;
            // FPS LIMIT IMPLEMENTATION HERE
            if (fx.fps.fixed > 0) {
                fx.fps.fpsThreshold += dt;
                if (fx.fps.fpsThreshold < 1.0 / fx.fps.fixed) {
                    window.cancelAnimationFrame(fx.fps.req);
                    setTimeout(() => { fx.fps.req = window.requestAnimationFrame(fx.fps.run); }, fx.fps.fpsThreshold * 1000);
                    var stop = true;
                }
                else {
                    fx.fps.fpsThreshold -= 1.0 / fx.fps.fixed;
                }
            }
            //執行
            if (typeof (animate) == "function" && fx.sakura.type && !stop) {
                animate();
            }
            if (typeof (audv.run) == "function" && audv.opt.type && !stop) {
                audv.run();
            }
        }
    },
    sakura: {
        chg_opc: function () {
            if (fx.sakura.tmp && fx.sakura.type) {
                $("#sakura").css("opacity", 1 - this.opacity / 100);
            }
        }
    }
};
//時鐘設定
clock_opt = {
    time: {
        AM_PM: "",
        mon: "",
    },
    remind: {
        run: false,
    },
    day: {
        zh: [
            "日", "一", "二", "三", "四", "五", "六"
        ],
        us: [
            "&nbsp;Sun", "&nbsp;Mon", "Tues", "&nbsp;Wed", "Thur", "&nbsp;Fri", "&nbsp;Sat"
        ]
    }
};
//音效可視化
audv = {
    opt: {}
};
//==================================面板==================================
panel = {
    RegExp: /panel_(?<panel>.*)\$(?<type>.*)$/gm,
    creat: function (_id) {
        this[_id] = {
            id: _id,
            dom: $("#" + _id),
            bg: {},
            bor: {},
            pos: {},
            shadow: {},
            display: function (bool) {
                this.dom[bool ? "fadeIn" : "fadeOut"]();
            },
            css: function (set) {
                this.dom.css(set);
            },
            chg: function (type) {
                switch (type) {
                    case ("bg"):
                        if (this.bg.type == "color") { //純色
                            this.css({
                                "backdrop-filter": "blur(" + this.bg.blur + "px)",
                                "background-image": "",
                                "background-color": to_rgba(this.bg.color, this.bg.opc)
                            });
                        }
                        else if (this.bg.type == "img") { //圖片
                            this.css({
                                "backdrop-filter": "blur(" + this.bg.blur + "px)",
                                "background-image": this.bg.img,
                                "background-color": ""
                            });
                        }
                        break;
                    case ("bor"):
                        this.css({
                            "border": this.bor.type,
                            "border-width": this.bor.width,
                            "border-color": to_rgba(this.bor.color, this.bor.opc)
                        });
                        break;
                    case ("pos"):
                        if (this.pos.type == "pc") { //百分比模式 PerCentage
                            this.css({
                                "left": this.pos.pc_x,
                                "bottom": this.pos.pc_y,
                            });
                        }
                        else if (this.pos.type == "px") { //像素模式 PiXel
                            this.css({
                                "left": this.pos.px_x,
                                "bottom": this.pos.px_y,
                            });
                        }
                        break;
                }
            }
        };
    },
};
window.requestAnimationFrame(fx.fps.run);
//================================創建面板================================
panel.creat("clock"); //時鐘
panel.creat("cal"); //日曆
//==================================監聽==================================
window.wallpaperPropertyListener = {
    //▲-------------------------監聽暫停-------------------------▲
    setPaused: function (isPaused) {
        if (!isPaused) { //重新啟動
            timer.set();
        }
        else { //已暫停
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
        if (window.fx.dom) { //等待DOM加載完成
            window["apply_setting"](user);
        }
        else {
            console.log("DOM need ready!");
            $(() => { window["apply_setting"](user); });
        }
    }
};
$(() => {
    fx.dom = true;
    window["apply_setting"] = function (user) {
        //==================================背景==================================
        let body = $("body");
        function change_bg() {
            body.css({
                "background-image": "",
                "background-color": ""
            });
            if (bg.video_tmp) {
                $("#bg_video").remove();
                bg.video_tmp = false;
            }
            switch (bg.type) {
                case ("color"):
                    body.css({
                        "background-color": bg.color
                    });
                    break;
                case ("image"):
                    body.css({
                        "background-image": "url('" + ((bg.img_type == "file") ?
                            bg.img_file :
                            bg.img_url) + "')"
                    });
                    break;
                case ("video"):
                    if (bg.video_file) {
                        if (!bg.video_tmp) {
                            $("body").append("<video id=\"bg_video\" src=\"\" loop autoplay></video>");
                            bg.video_tmp = true;
                        }
                        $("#bg_video")[0]["src"] = "file:///" + bg.video_file;
                    }
                    break;
                case ("bing_api"):
                    $.getJSON("https://bing.biturl.top/", (json) => {
                        body.css({
                            "background-image": "url('" + json.url + "')"
                        });
                    });
                    break;
            }
        }
        if (user.background_type) {
            bg.type = user.background_type.value;
            change_bg();
        }
        if (user.background_color) {
            bg.color = get_color(user.background_color.value, true);
            change_bg();
        }
        if (user.background_image_type) {
            bg.img_type = user.background_image_type.value;
            change_bg();
        }
        if (user.background_image_file) {
            let val = user.background_image_file.value;
            bg.img_file = (val == "") ? ("background.webp") : ("file:///" + val);
            change_bg();
        }
        if (user.background_image_url) {
            let val = user.background_image_url.value;
            if (val.indexOf("https://") === -1 && val.indexOf("http://") === -1) {
                val = "https://" + val;
            }
            bg.img_url = val;
            change_bg();
        }
        if (user.background_video_file) {
            bg.video_file = unescape(user.background_video_file.value);
            change_bg();
        }
        if (user.background_size) {
            body.css({ "background-size": user.background_size.value });
        }
        //==================================特效==================================
        if (user.fx_sakura$type) {
            let val = user.fx_sakura$type.value;
            if (val) {
                if (!fx.sakura.tmp) {
                    $.get("sakura/shader.html", (data) => {
                        $("body").append(data);
                        sakura_onload();
                    });
                    window.fx.sakura.tmp = true;
                }
            }
            $("#sakura")[val ? "fadeIn" : "fadeOut"]();
            window.fx.sakura.type = val;
            fx.sakura.chg_opc();
        }
        if (user.fx_sakura$opc) {
            window.fx.sakura.opacity = user.fx_sakura$opc.value;
            fx.sakura.chg_opc();
        }
        const $key = Object.keys(user);
        if ($key.some((t) => { return t.indexOf("$") != -1; })) {
            // ============================================================================================
            //                                   ※switch 大型搜尋設置
            // ============================================================================================
            for (const [$key, $val] of Object.entries(user)) {
                //==================================聲音可視化==================================Z
                let audio = "audio_visualization$";
                if ($key.indexOf(audio) === 0) { //驗證是否為聲音可視化
                    let main = $key.slice(audio.length);
                    let val = $val["value"];
                    if (main === "type" && val === true && !audv.tmp) {
                        $.getScript("audio_visualization/index.js", () => {
                            audv.tmp = true;
                            audv.reload();
                        });
                    }
                    audv.opt[main] = val;
                    if (audv.tmp) {
                        audv.set(main);
                    }
                    // 在json添加| audio_visualization$類型 |
                }
                //==================================面板==================================
                if ($key.indexOf("panel_") === 0) { //驗證是否為面板
                    let key = panel.RegExp.exec($key).groups;
                    let val = $val["value"];
                    panel.RegExp.lastIndex = 0;
                    panel.set(key.panel, key.type, val);
                }
            }
        }
    };
});
//==================================函式==================================
//讀取顏色
function get_color(data, type) {
    let color = data.split(' ');
    if (type) { //轉RGB格式
        return 'rgb(' + color.map(function (c) { return Math.ceil(c * 255); }) + ')';
    }
    else { //轉數組
        return color.map(function (c) { return Math.ceil(c * 255); });
    }
}
//顏色+透明度 => RGBA
function to_rgba(color, opacity) {
    return "rgba(" + color + "," + opacity + ")";
}
