$.ajaxSetup({
    cache: true
})

console.log("main settings is load!")
//==================================變數==================================
const bg = {} as {
    type: "color" | "image" | "video" | "bing_api",
    color: string,
    img_type: "file" | "url",
    img_file: string,
    img_url: string,
    video_file: string,
    video_tmp: boolean,
}
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
            let now = performance.now() / 1000 // 
            let dt = now - fx.fps.last
            let stop = false

            fx.fps.last = now
            // FPS LIMIT IMPLEMENTATION HERE
            if (fx.fps.fixed > 0) {
                fx.fps.fpsThreshold += dt
                if (fx.fps.fpsThreshold < 1.0 / fx.fps.fixed) {
                    window.cancelAnimationFrame(fx.fps.req)
                    setTimeout(() => { fx.fps.req = window.requestAnimationFrame(fx.fps.run) }, fx.fps.fpsThreshold * 1000)
                    stop = true
                } else {
                    fx.fps.fpsThreshold -= 1.0 / fx.fps.fixed
                }
            }
            //執行
            if (fx.sakura.type && fx.sakura.opacity !== 0 && !stop) { fx.sakura.animate() }
            if (fx.snow.type && fx.snow.opacity !== 0 && !stop) { fx.snow.animate() }
            if (audv.opt.type && !stop) { audv.run() }
        }
    },
    wec: {
        "brs": 50 as number,
        "con": 50 as number,
        "hue": 50 as number,
        "sa": 50 as number,
    },
    wec_style: {
        "wec": "",
        "alignmentfliph": ""
    },
    sakura: {//櫻花
        chg_opc: function () {
            if (fx.sakura.tmp && fx.sakura.type) {
                $("#sakura").css("opacity", this.opacity / 100)
            }
        },
        type: false,
        tmp: false,
        opacity: 0 as number,

        onload: undefined as unknown as () => void,
        animate: () => { },
    },
    snow: {//雪花
        chg_opc: function () {
            if (fx.snow.tmp && fx.snow.type) {
                const el = $("#snow_shader")
                el.css("opacity", this.opacity / 100)
            }
        },
        type: false,
        tmp: false,
        opacity: 0 as number,

        onload: undefined as unknown as () => void,
        animate: () => { },
    },
    /**
     * @name 等待DOM加載完成
    **/
    dom: false,
}
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
        lang: "zh" as "zh" | "en",
        zh: [ //中文
            "日", "一", "二", "三", "四", "五", "六"
        ],
        en: [ //英文縮寫
            "&nbsp;Sun", "&nbsp;Mon", "Tues", "&nbsp;Wed", "Thur", "&nbsp;Fri", "&nbsp;Sat"
        ],
    },
    type: "",
    color: "",
    twelve_hour: false,
    show_sec: false,
    show_week: false,
}
//音效可視化
interface audv_opt_type {
    [opt: string]: any,
    maintype: "strip" | "round"
}
const audv = {
    audio: [] as Float32Array[],
    opt: {} as audv_opt_type,
    run: undefined as unknown as () => void,
    set: undefined as unknown as (type: keyof audv_opt_type) => void,
    reload: undefined as unknown as () => void,
    tmp: false as boolean,
    maintmp: {} as unknown as {
        "strip": boolean,
        "round": boolean,
    }
}
//快取DOM
const DOMcache = {} as { [id: string]: HTMLElement | JQuery<HTMLElement> }
//==================================面板==================================
interface Panel {
    id: string,
    dom: JQuery<HTMLDivElement>,
    bg: {
        type: "color" | "img",
        blur: number,
        opc: number,
        color: Array<number>,
        img: string,
    },
    bor: {
        type: "" | "none",
        width: number,
        color: Array<number>,
        opc: number,
    },
    pos: {
        type: "pc" | "px",
        pc_x: string,
        pc_y: string,
        px_x: string,
        px_y: string,
    },
    shadow: {
        type: string,
        blur: string,
        size: string,
        color: string,
    },
    color: string,
    display: (type: boolean) => void,
    css: (type: { [css_key: string]: string | number }) => void,
    chg: (type: "bg" | "bor" | "pos") => void,
}

const panel = {
    items: {} as { [item: string]: Panel },

    RegExp: /panel_(?<panel>.*)\$(?<type>.*)$/gm,
    set: undefined as unknown as (pan: string, type: string, val: any) => void,
    creat: function (_id: string) {
        // 新增新的面板
        this.items[_id] = {
            id: _id, //ID
            dom: $("#" + _id), //dom
            color: "", //顏色
            bg: {} as Panel["bg"], //背景
            bor: {} as Panel["bor"], //邊框
            pos: {} as Panel["pos"], //位置
            shadow: {} as Panel["shadow"], //光暈
            display: function (bool: boolean) {//顯示模式
                this.dom[bool ? "fadeIn" : "fadeOut"]()
            },
            css: function (style) {//修改css
                this.dom.css(style)
            },
            chg: function (type: "bg" | "bor" | "pos") {  // 修改背景類型
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

window.requestAnimationFrame(fx.fps.run);
//================================創建面板================================
panel.creat("clock") //時鐘
panel.creat("cal") //日曆
panel.creat("logo") //標誌
//==================================監聽==================================
interface Window {
    wallpaperPropertyListener: {
        setPaused: (isPaused: boolean) => void,
        applyGeneralProperties: (setting: any) => void,
        applyUserProperties: (user: { [key: string]: any }) => void
    }
}
window.wallpaperPropertyListener = {
    //▲-------------------------監聽暫停-------------------------▲
    setPaused: function (isPaused) {
        if (!isPaused) {//重新啟動
            timer.set()
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
    applyUserProperties: function (user: { [key: string]: { value: any } }) {
        if (fx.dom) {//等待DOM加載完成
            window.apply_setting(user)
        } else {
            console.log("DOM need ready!")
            $(() => { window.apply_setting(user) })
        }
    }
};

interface Window {
    apply_setting: (setting: { [key: string]: { value: any } }) => void;
}
$(() => {
    fx.dom = true
    window.apply_setting = function (user: { [key: string]: { value: any } }): void {
        //==================================翻轉==================================
        function change_wec() {
            const el = DOMcache.wec_style as HTMLStyleElement || (() => {
                const el = document.createElement("style")
                el.id = "wec_style"
                DOMcache.wec_style = el
                return document.body.appendChild(el)
            })()

            let style = ""
            for (const [key, val] of Object.entries(fx.wec)) {
                if (val === 50) { continue }
                switch (key) {
                    case ("brs")://亮度
                        let brightness = val / 50
                        style += `brightness(${brightness}) `
                        break
                    case ("con")://對比度
                        let contrast = val / 50
                        style += `contrast(${contrast}) `
                        break
                    case ("sa")://色相偏差
                        let saturate = val / 50
                        style += `saturate(${saturate}) `
                        break
                    case ("hue")://飽和度
                        let hue_rotate = ((val - 50) / 50) * 180
                        style += `hue-rotate(${hue_rotate}deg) `
                        break
                }
            }


            fx.wec_style.wec = style === "" ? "" : `html{filter:${style};};`
            el.innerHTML = fx.wec_style.wec + fx.wec_style.alignmentfliph
        }
        let new_wec = false
        if (user.wec_brs) { fx.wec.brs = user.wec_brs.value; new_wec = true }
        if (user.wec_con) { fx.wec.con = user.wec_con.value; new_wec = true }
        if (user.wec_hue) { fx.wec.hue = user.wec_hue.value; new_wec = true }
        if (user.wec_sa) { fx.wec.sa = user.wec_sa.value; new_wec = true }
        if (new_wec) change_wec()

        if (user.alignmentfliph) {
            const val = user.alignmentfliph.value
            const el = DOMcache.wec_style as HTMLStyleElement || (() => {
                const el = document.createElement("style")
                el.id = "wec_style"
                DOMcache.wec_style = el
                return document.body.appendChild(el)
            })()

            const style = val ? "body>div{transform:rotateY(180deg);};" : ""
            fx.wec_style.alignmentfliph = style
            el.innerHTML = fx.wec_style.wec + fx.wec_style.alignmentfliph
        }
        //==================================背景==================================
        const $key = Object.keys(user)
        if (!$key.some((t) => { return t.indexOf("$") != -1 })) { return }
        // ============================================================================================
        //                                   ※switch 大型搜尋設置
        // ============================================================================================
        for (const [$key, $val] of Object.entries(user)) {

            if ($val === null || !$val.hasOwnProperty("value")) { continue }
            const val = $val["value"]

            //==================================聲音可視化==================================
            const audio = "audv$"
            if ($key.indexOf(audio) === 0) {//驗證是否為聲音可視化
                let main = $key.slice(audio.length) as string
                if (main === "type" && val === true && !audv.tmp) {
                    $.getScript("audio_visualization/index.js", () => {
                        audv.tmp = true
                        audv.reload()
                    })
                }
                audv.opt[main] = val
                if (audv.tmp) { audv.set(main); }
                // 在json添加| audv$類型 |
                continue
            }
            //==================================面板==================================
            if ($key.indexOf("panel_") === 0) {//驗證是否為面板
                const exec = panel.RegExp.exec($key)
                if (exec === null) { return }
                const key = exec.groups
                if (key === undefined) { return }
                panel.RegExp.lastIndex = 0;
                panel.set(key.panel, key.type, val)
                continue
            }
            //==================================特效==================================
            if ($key.indexOf("fx$") === 0) {//驗證是否為聲音可視化
                const main_and_type = $key.substr(3)
                const [main, type] = main_and_type.split("$$")

                if (main === "info") { continue }
                //fx$main$$type
                fx_switch(main, type, val)
                continue
            }
            //==================================背景==================================
            if ($key.indexOf("bg$") === 0) {//驗證是否為聲音可視化
                const type = $key.substr(3)
                //bg$main
                bg_switch(type, val)
                continue
            }
        }
    }

    function fx_switch(main: string, type: string, val: any) {
        switch (main) {
            case "sakura":
                switch (type) {
                    case "type":
                        if (val) {
                            if (!fx.sakura.tmp) {
                                $.get("fx/sakura/shader.html", (data: string) => {
                                    const el = document.createElement("div")
                                    el.id = "sakura_shader"
                                    el.innerHTML = '<canvas id="sakura"></canvas>'
                                    document.body.appendChild(el)
                                    $.getScript("fx/sakura/main.js", () => {
                                        $(data).appendTo(el)
                                        fx.sakura.onload()
                                    })
                                })
                                fx.sakura.tmp = true
                            }
                        }

                        const sakura = DOMcache.sakura as JQuery<HTMLElement> || (() => {
                            const el = $("#sakura")
                            if (el.length !== 0) DOMcache.sakura = el
                            return el
                        })()
                        sakura[val ? "fadeIn" : "fadeOut"]()

                        fx.sakura.type = val
                        fx.sakura.chg_opc()
                        break
                    case "opacity":
                        fx.sakura.opacity = val
                        fx.sakura.chg_opc()
                }
                break
            case "snow":
                switch (type) {
                    case "type":
                        if (val) {
                            if (!fx.snow.tmp) {
                                $.getScript("fx/snow/main.js", () => {
                                    fx.snow.onload()
                                })
                                fx.snow.tmp = true
                            }
                        }

                        const snow = DOMcache.snow as JQuery<HTMLElement> || (() => {
                            const el = $("#snow_shader")
                            if (el.length !== 0) DOMcache.snow = el
                            return el
                        })()

                        snow[val ? "fadeIn" : "fadeOut"]()

                        fx.snow.type = val
                        fx.snow.chg_opc()
                        break
                    case "opacity":
                        fx.snow.opacity = val
                        fx.snow.chg_opc()
                        break
                }
                break
        }
    }

    function bg_switch(type: string, val: string) {
        const body = DOMcache.body as JQuery<HTMLElement> || (() => {
            return DOMcache.body = $("body")
        })()
        switch (type) {
            case "type":
                bg.type = val as "video" | "color" | "image" | "bing_api"
                change_bg()
                break
            case "color":
                bg.color = get_color(val, true)
                change_bg()
                break
            case "image_type":
                bg.img_type = val as "file" | "url"
                change_bg()
                break
            case "image_file":
                bg.img_file = (val == "") ? ("background.webp") : ("file:///" + val)
                change_bg()
                break
            case "image_url":
                if (val.indexOf("https://") === -1 && val.indexOf("http://") === -1) {
                    val = "https://" + val
                }
                bg.img_url = val
                change_bg()
                break
            case "video_file":
                bg.video_file = unescape(val)
                change_bg()
                break
            case "size":
                body.css({ "background-size": val })
                break
        }

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
                        const bg_video = document.getElementById("bg_video") as HTMLVideoElement
                        bg_video.src = "file:///" + bg.video_file
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
    }
})

//==================================函式======================================

//讀取顏色
function get_color(data: string, type: true): string
function get_color(data: string, type?: false): Array<number>
function get_color(data: string, type?: boolean): string | Array<number> {
    let color = data.split(' ');
    if (type) { //轉RGB格式
        return 'rgb(' + color.map(function (c: any) { return Math.ceil(c * 255) }) + ')';
    } else { //轉數組
        return color.map(function (c: any) { return Math.ceil(c * 255) });
    }
}

//顏色+透明度 => RGBA
function to_rgba(color: number[] | string, opacity: number): string {
    return "rgba(" + color + "," + opacity + ")"
}