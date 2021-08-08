"use strict";
$.ajaxSetup({
    cache: true
});
console.log("main settings is load!");
//==================================變數==================================
const bg = {};
//特效設定
const fx = {
    fps: {
        fixed: 0,
        last: performance.now() / 1000,
        fpsThreshold: 0,
        req: 0,
        run: function () {
            // 刷新畫面
            fx.fps.req = window.requestAnimationFrame(fx.fps.run);
            // 計算時差
            let now = performance.now() / 1000; // 
            let dt = now - fx.fps.last;
            let stop = false;
            fx.fps.last = now;
            // FPS LIMIT IMPLEMENTATION HERE
            if (fx.fps.fixed > 0) {
                fx.fps.fpsThreshold += dt;
                if (fx.fps.fpsThreshold < 1.0 / fx.fps.fixed) {
                    window.cancelAnimationFrame(fx.fps.req);
                    setTimeout(() => { fx.fps.req = window.requestAnimationFrame(fx.fps.run); }, fx.fps.fpsThreshold * 1000);
                    stop = true;
                }
                else {
                    fx.fps.fpsThreshold -= 1.0 / fx.fps.fixed;
                }
            }
            //執行
            if (typeof (fx.sakura.animate) == "function" && fx.sakura.type && !stop) {
                fx.sakura.animate();
            }
            if (typeof (audv.run) == "function" && audv.opt.type && !stop) {
                audv.run();
            }
        }
    },
    wec: {
        "brs": 50,
        "con": 50,
        "hue": 50,
        "sa": 50,
    },
    wec_style: {
        "wec": "",
        "alignmentfliph": ""
    },
    sakura: {
        chg_opc: function () {
            if (fx.sakura.tmp && fx.sakura.type) {
                $("#sakura").css("opacity", 1 - this.opacity / 100);
            }
        },
        type: false,
        tmp: false,
        opacity: 0,
        onload: undefined,
        animate: undefined,
    },
    dom: false,
};
//時鐘設定
const clock_opt = {
    time: {
        AM_PM: "",
        new_sec: 0,
        mon: 0,
        hr: 0,
        min: 0,
        sec: 0,
        date: 0,
    },
    remind: {
        run: false,
        type: "",
        color: "",
    },
    day: {
        lang: "zh",
        zh: [
            "日", "一", "二", "三", "四", "五", "六"
        ],
        en: [
            "&nbsp;Sun", "&nbsp;Mon", "Tues", "&nbsp;Wed", "Thur", "&nbsp;Fri", "&nbsp;Sat"
        ],
    },
    type: "",
    color: "",
    twelve_hour: false,
    show_sec: false,
    show_week: false,
};
const audv = {
    audio: [],
    opt: {},
    run: undefined,
    set: undefined,
    reload: undefined,
    tmp: false,
    maintmp: {}
};
//快取DOM
const DOMcache = {};
const panel = {
    items: {},
    RegExp: /panel_(?<panel>.*)\$(?<type>.*)$/gm,
    set: undefined,
    creat: function (_id) {
        // 新增新的面板
        this.items[_id] = {
            id: _id,
            dom: $("#" + _id),
            color: "",
            bg: {},
            bor: {},
            pos: {},
            shadow: {},
            display: function (bool) {
                this.dom[bool ? "fadeIn" : "fadeOut"]();
            },
            css: function (style) {
                this.dom.css(style);
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
panel.creat("logo"); //標誌
window.wallpaperPropertyListener = {
    //▲-------------------------監聽暫停-------------------------▲
    setPaused: function (isPaused) {
        if (!isPaused) { //重新啟動
            timer.set();
        }
        // else
        // { //已暫停
        // }
    },
    //▲-------------------------監聽系統設定-------------------------▲
    applyGeneralProperties: function (setting) {
        if (setting.fps) {
            fx.fps.fixed = setting.fps;
        }
    },
    //▲-------------------------監聽用戶設定-------------------------▲
    applyUserProperties: function (user) {
        if (fx.dom) { //等待DOM加載完成
            window.apply_setting(user);
        }
        else {
            console.log("DOM need ready!");
            $(() => { window.apply_setting(user); });
        }
    }
};
$(() => {
    fx.dom = true;
    window.apply_setting = function (user) {
        //==================================翻轉==================================
        function change_wec() {
            const el = DOMcache.wec_style || (() => {
                const el = document.createElement("style");
                el.id = "wec_style";
                DOMcache.wec_style = el;
                return document.body.appendChild(el);
            })();
            let style = "";
            for (const [key, val] of Object.entries(fx.wec)) {
                if (val === 50) {
                    continue;
                }
                switch (key) {
                    case ("brs"): //亮度
                        let brightness = val / 50;
                        style += `brightness(${brightness}) `;
                        break;
                    case ("con"): //對比度
                        let contrast = val / 50;
                        style += `contrast(${contrast}) `;
                        break;
                    case ("sa"): //色相偏差
                        let saturate = val / 50;
                        style += `saturate(${saturate}) `;
                        break;
                    case ("hue"): //飽和度
                        let hue_rotate = ((val - 50) / 50) * 180;
                        style += `hue-rotate(${hue_rotate}deg) `;
                        break;
                }
            }
            fx.wec_style.wec = style === "" ? "" : `html{filter:${style};};`;
            el.innerHTML = fx.wec_style.wec + fx.wec_style.alignmentfliph;
        }
        let new_wec = false;
        if (user.wec_brs) {
            fx.wec.brs = user.wec_brs.value;
            new_wec = true;
        }
        if (user.wec_con) {
            fx.wec.con = user.wec_con.value;
            new_wec = true;
        }
        if (user.wec_hue) {
            fx.wec.hue = user.wec_hue.value;
            new_wec = true;
        }
        if (user.wec_sa) {
            fx.wec.sa = user.wec_sa.value;
            new_wec = true;
        }
        if (new_wec)
            change_wec();
        if (user.alignmentfliph) {
            const val = user.alignmentfliph.value;
            const el = DOMcache.wec_style || (() => {
                const el = document.createElement("style");
                el.id = "wec_style";
                DOMcache.wec_style = el;
                return document.body.appendChild(el);
            })();
            const style = val ? "body>div{transform:rotateY(180deg);};" : "";
            fx.wec_style.alignmentfliph = style;
            el.innerHTML = fx.wec_style.wec + fx.wec_style.alignmentfliph;
        }
        //==================================背景==================================
        const body = DOMcache.body || (() => {
            return DOMcache.body = $("body");
        })();
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
                        const bg_video = document.getElementById("bg_video");
                        bg_video.src = "file:///" + bg.video_file;
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
                    $.get("fx/sakura/shader.html", (data) => {
                        const el = document.createElement("div");
                        el.id = "sakura_shader";
                        el.innerHTML = '<canvas id="sakura"></canvas>';
                        document.body.appendChild(el);
                        $.getScript("fx/sakura/main.js", () => {
                            $(data).appendTo(el);
                            fx.sakura.onload();
                        });
                    });
                    fx.sakura.tmp = true;
                }
            }
            fx.sakura.type = val;
            fx.sakura.chg_opc();
            const sakura = DOMcache.sakura || (() => {
                const el = $("#sakura");
                if (el.length !== 0)
                    DOMcache.sakura = el;
                return el;
            })();
            sakura[val ? "fadeIn" : "fadeOut"]();
        }
        if (user.fx_sakura$opc) {
            fx.sakura.opacity = user.fx_sakura$opc.value;
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
                        audv.set("main");
                    }
                    // 在json添加| audio_visualization$類型 |
                }
                //==================================面板==================================
                if ($key.indexOf("panel_") === 0) { //驗證是否為面板
                    const exec = panel.RegExp.exec($key);
                    if (exec === null) {
                        return;
                    }
                    const key = exec.groups;
                    if (key === undefined) {
                        return;
                    }
                    const val = $val["value"];
                    panel.RegExp.lastIndex = 0;
                    panel.set(key.panel, key.type, val);
                }
            }
        }
    };
});
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
