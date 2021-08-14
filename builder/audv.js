"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $export = [
    {
        "options": [
            { "長條": "strip" },
            { "圓形": "round" }
        ],
        "type": "combo",
        "value": "strip",
        "name": "類型",
        "id": "maintype"
    },
    {
        "name": "音頻設置",
        "id": "audio_info"
    },
    {
        "max": 100,
        "min": 0,
        "type": "slider",
        "value": 30,
        "name": "&emsp;振動幅度",
        "id": "amplitude"
    },
    {
        "max": 100,
        "min": 0,
        "type": "slider",
        "value": 5,
        "name": "&emsp;下落速度",
        "id": "decline"
    },
    {
        "max": 120,
        "min": 2,
        "step": 2,
        "type": "slider",
        "value": 120,
        "name": "&emsp;疏密度<sub>數量</sub>",
        "id": "pointNum"
    },
    {
        "name": "位置設置",
        "id": "pos_info"
    },
    {
        "max": 100,
        "min": 0,
        "precision": 1,
        "step": 0.1,
        "type": "slider",
        "value": 95,
        "name": "&emsp;上下偏移<sub>%</sub>",
        "id": "offsetY"
    },
    {
        "max": 100,
        "min": 0,
        "precision": 1,
        "step": 0.1,
        "type": "slider",
        "value": 26,
        "name": "&emsp;左右偏移<sub>%</sub>",
        "id": "offsetX"
    },
    {
        "name": "顏色設置",
        "id": "color_info"
    },
    {
        "condition": "panel_cal$type.value == true",
        "options": [
            { "單色": "monochrome" },
            { "漸變": "colorTransformation" },
            { "彩色": "rainBow" }
        ],
        "type": "combo",
        "value": "monochrome",
        "name": "&emsp;顏色模式",
        "id": "colorMode"
    },
    {
        "condition": " && audv$colorMode.value == \"monochrome\"",
        "type": "color",
        "value": "1 1 1",
        "name": "&emsp;顏色",
        "id": "color"
    },
    {
        "max": 100,
        "min": 0,
        "type": "slider",
        "value": "90",
        "name": "&emsp;透明度<sub>%</sub>",
        "id": "opacity"
    },
    {
        "max": 16,
        "min": 0,
        "type": "slider",
        "value": "0",
        "name": "&emsp;陰影<sub>px</sub>",
        "id": "shadowBlur"
    },
    {
        "type": "color",
        "value": "1 1 1",
        "name": "&emsp;&emsp;顏色",
        "id": "shadowColor"
    },
    {
        "name": "基礎設置",
        "id": "setting_info"
    },
    {
        "condition": " && audv$maintype.value == \"strip\"",
        "info": "長條使用 strip",
        "type": "bool",
        "value": true,
        "name": "&emsp;顯示長條",
        "id": "isBars"
    },
    {
        "condition": " && audv$maintype.value == \"strip\"",
        "info": "長條使用 strip",
        "type": "bool",
        "value": true,
        "name": "&emsp;頂點間連線",
        "id": "isLineTo$strip"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "info": "圓環使用 round",
        "type": "bool",
        "value": true,
        "name": "&emsp;顯示長條",
        "id": "isLineTo$round"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "info": "圓環使用 round",
        "options": [
            { "內圓": "innerRing" },
            { "外圓": "outerRing" },
            { "內外圓": "twoRing" }
        ],
        "type": "combo",
        "value": "twoRing",
        "name": "&emsp;音頻成長方向",
        "id": "lineDirection"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "info": "圓環使用 round",
        "type": "bool",
        "value": true,
        "name": "&emsp;圓環顯示",
        "id": "isRing"
    },
    {
        "condition": " && audv$maintype.value == \"round\"&& audv$isRing.value == true",
        "info": "圓環使用 round",
        "type": "bool",
        "value": true,
        "name": "&emsp;&emsp;靜態圓環",
        "id": "isStaticRing"
    },
    {
        "condition": " && audv$maintype.value == \"round\"&& audv$isRing.value == true",
        "info": "圓環使用 round",
        "type": "bool",
        "value": true,
        "name": "&emsp;&emsp;動態內圓",
        "id": "isInnerRing"
    },
    {
        "condition": " && audv$maintype.value == \"round\"&& audv$isRing.value == true",
        "info": "圓環使用 round",
        "type": "bool",
        "value": true,
        "name": "&emsp;&emsp;動態外圓",
        "id": "isOuterRing"
    },
    {
        "info": "共用 all",
        "type": "bool",
        "value": false,
        "name": "&emsp;波浪模式",
        "id": "isWave"
    },
    {
        "condition": " && audv$maintype.value == \"round\" && audv$isWave.value == true",
        "info": "圓環使用 round",
        "options": [
            { "內圓": "innerRing" },
            { "外圓": "outerRing" },
            { "內外圓": "twoRing" }
        ],
        "type": "combo",
        "value": "innerRing",
        "name": "&emsp;&emsp;成長方向",
        "id": "waveDirectionCircle"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "type": "bool",
        "value": true,
        "name": "&emsp;小球設置",
        "id": "isBall"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "max": 100,
        "min": 0,
        "step": 5,
        "type": "slider",
        "value": 50,
        "name": "&emsp;&emsp;靜態圓環距離<sub>px</sub>",
        "id": "ballDistance"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "max": 5,
        "min": 0,
        "step": 0.5,
        "type": "slider",
        "value": 1,
        "name": "&emsp;&emsp;跳動幅度",
        "id": "ballDirection"
    },
    {
        "condition": " && audv$maintype.value == \"round\"",
        "type": "bool",
        "value": false,
        "name": "&emsp;&emsp;旋轉綁定",
        "id": "bindRingRotation"
    },
    {
        "name": "大小設置",
        "id": "size_info"
    },
    {
        "condition": " && audv$maintype.value == \"strip\"",
        "info": "長條使用 strip",
        "max": 5,
        "min": 1,
        "type": "slider",
        "value": 1,
        "name": "&emsp;&emsp;寬度<sub>%</sub>",
        "id": "barsWidth"
    },
    {
        "condition": " && audv$maintype.value == \"strip\"",
        "info": "長條使用 strip",
        "max": 5,
        "min": 0,
        "type": "slider",
        "value": 1,
        "name": "&emsp;&emsp;最低高度<sub>px</sub>",
        "id": "barsHeight"
    },
    {
        "info": "共用",
        "options": [
            { "直角": "butt" },
            { "倒角": "square" },
            { "圓弧": "round" }
        ],
        "type": "combo",
        "value": "butt",
        "name": "&emsp;&emsp;折角樣式",
        "id": "lineJoin"
    }
];
$export.forEach((i) => {
    i.condition = "audv$type.value == true" + (i.condition || "");
});
$export.unshift({
    "type": "bool",
    "value": true,
    "name": "啟用音效視覺化",
    "id": "type"
});
exports.default = $export;
