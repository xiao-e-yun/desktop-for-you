"use strict";
console.log("audio-visualization settings is load!");
console.log("jQuery AudioVisualizer Bars v0.0.15\njQuery AudioVisualizer  Circle v0.0.20\n\nproject form \n  https://github.com/Alice-Jie/AudioVisualizer\n  https://gitee.com/Alice_Jie/circleaudiovisualizer\n  https://steamcommunity.com/sharedfiles/filedetails/?id=921617616\n\nLICENSE MIT licensed\nAUTHOR Alice\nDATE 2018/08/17");
let sel = $("#audv");
audv.set = function (type) {
    let val = audv.opt[type];
    function turn($key, $val = val) {
        if (audv.maintmp && audv.maintmp.strip) {
            sel["visualizerBars"]("set", $key, $val);
        }
        ;
        if (audv.maintmp && audv.maintmp.round) {
            sel["visualizerCircle"]("set", $key, $val);
        }
        ;
    }
    if (type === "type") {
        wallpaperRegisterAudioListener((audio) => { this.audio = audio; });
        sel[val ? "fadeIn" : "fadeOut"]();
    }
    else if (type === "maintype") {
        if (!this.maintmp) {
            this.maintmp = {};
        }
        let tmp = this.maintmp;
        if (val == "strip" && !tmp.strip) {
            $.getScript("audio_visualization/jquery.audiovisualizer.bars.js", () => {
                tmp.strip = true;
                sel["visualizerBars"]();
                audv.reload();
            });
        }
        if (val == "round" && !tmp.round) {
            $.getScript("audio_visualization/jquery.audiovisualizer.circle.js", () => {
                tmp.round = true;
                sel["visualizerCircle"]();
                audv.reload();
            });
        }
        $("#canvas-visualizerBars")[val == "strip" ? "fadeIn" : "fadeOut"]();
        $("#canvas-visualizerCircle")[val == "round" ? "fadeIn" : "fadeOut"]();
    }
    if (type === "colorMode" && val === "monochrome") {
        turn("color", get_color(audv.opt.color).join(","));
    }
    switch (type) { //顏色
        case ("color"):
        case ("shadowColor"):
            val = get_color(val).join(",");
    }
    turn(type);
};
audv.reload = function () {
    Object.keys(this.opt).forEach(($key) => {
        this.set($key);
    });
};
audv.run = function () {
    if (audv.opt.maintype == "strip" && this.maintmp.strip) {
        sel["visualizerBars"]('drawCanvas', this.audio);
    }
    else if (audv.opt.maintype == "round" && this.maintmp.round) {
        sel["visualizerCircle"]('drawCanvas', this.audio);
    }
};
