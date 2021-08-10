"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        "name": "背景",
        "id": "bg",
        "items": [
            {
                "name": "背景類型",
                "id": "type",
                "type": "combo",
                "options": [
                    { "純色": "color" },
                    { "圖片": "image" },
                    { "影片": "video" },
                    { "每日一圖": "bing_api" }
                ],
                "value": "image"
            }, {
                "name": "&emsp;背景顏色",
                "id": "color",
                "type": "color",
                "condition": "bg$type.value == \"color\"",
                "value": "0 0 0"
            }, {
                "name": "&emsp;背景圖片",
                "id": "image_file",
                "type": "file",
                "condition": "bg$type.value == \"image\" && bg$image_type.value == \"file\"",
                "value": ""
            }, {
                "name": "&emsp;背景圖片",
                "id": "image_url",
                "type": "textinput",
                "condition": "bg$type.value == \"image\" && bg$image_type.value == \"url\"",
                "value": ""
            }, {
                "name": "&emsp;&emsp;檔案位置",
                "id": "image_type",
                "type": "combo",
                "options": [
                    { "檔案": "file" },
                    { "網址": "url" }
                ],
                "value": "file",
                "condition": "bg$type.value == \"image\""
            }, {
                "name": "&emsp;背景大小",
                "id": "size",
                "type": "combo",
                "options": [
                    { "裁剪並保持同比例": "cover" },
                    { "縮放並保持同比例": "contaion" },
                    { "原比例背景圖片": "auto" }
                ],
                "value": "cover",
                "condition": "bg$type.value == \"image\""
            }, {
                "name": "&emsp;背景影片",
                "id": "background_video_file",
                "condition": "bg$type.value == \"video\"",
                "type": "file",
                "value": ""
            }, {
                "name": "&emsp;&emsp;<a href='https://video.online-convert.com/convert-to-webm'>WebM 線上轉檔工具<small>最大100 MB</small></a><br>&emsp;&emsp;也可以使用其他工具 <code><a title='ffmpeg -i (輸入檔案) -c:v libvpx-vp9 -crf (畫質) -b:v 0 -b:a 128k -c:a libopus (輸出檔案)' href='https://stackoverflow.com/a/47512301'>ffmpeg</a></code>",
                "id": "background_video_info",
                "condition": "bg$type.value == \"video\"",
            }, {
                "name": "&emsp;由 Bing 提供",
                "id": "bing_api",
                "condition": "bg$type.value == \"bing_api\"",
            }
        ]
    }, {
        "name": "特效",
        "id": "fx",
        "items": [
            {
                "name": "※以下啟用功能可能會有較高占用",
                "id": "fxinfo"
            }, {
                "name": "櫻花特效",
                "id": "sakura$$type",
                "type": "bool",
                "value": false
            }, {
                "name": "&emsp;透明度<sub>%</sub>",
                "id": "sakura$$opc",
                "max": 100,
                "min": 0,
                "type": "slider",
                "value": 15,
                "condition": "fx$sakura$$type.value == true"
            }, {
                "name": "雪花特效",
                "id": "snow$$type",
                "type": "bool",
                "value": false
            }, {
                "name": "&emsp;透明度<sub>%</sub>",
                "id": "snow$$opc",
                "type": "slider",
                "max": 100,
                "min": 0,
                "value": 15,
                "condition": "fx$snow$$type.value == true"
            }
        ]
    }, {
        "name": "時鐘",
        "id": "clock",
        "class": "panel",
        "rep": {
            "pos_pc_x": { value: 80 },
            "pos_pc_y": { value: 5 },
            "size": { value: 60 }
        },
        items: [{
                "name": "&emsp;小時提醒<sub>顯示不明顯</sub>",
                "id": "remind",
                "type": "combo",
                "options": [
                    { "純色": "color" },
                    { "彩虹": "rainbow" },
                    { "關閉": "none" }
                ],
                "value": "color",
                "condition": "panel_clock$type.value == true"
            }, {
                "name": "&emsp;&emsp;顏色",
                "id": "remind_color",
                "type": "color",
                "value": "0 0 0",
                "condition": "panel_clock$type.value == true && panel_clock$remind.value == \"color\"",
            }, {
                "options": [
                    { "12小時制": true },
                    { "24小時制": false }
                ],
                "name": "&emsp;小時格式",
                "type": "combo",
                "value": true,
                "condition": "panel_clock$type.value == true",
            }, {
                "name": "&emsp;顯示秒數",
                "id": "show_sec",
                "type": "bool",
                "value": true,
                "condition": "panel_clock$type.value == true",
            }
        ]
    }, {
        "name": "日曆",
        "id": "cal",
        "class": "panel",
        "rep": {
            "pos_pc_x": { value: 62 },
            "pos_pc_y": { value: 5 },
            "size": { value: 40 },
        },
        items: [
            {
                "name": "&emsp;顯示星期",
                "id": "show_week",
                "type": "bool",
                "value": true,
                "condition": "panel_cal$type.value == true"
            },
            {
                "name": "&emsp;&emsp;星期標籤",
                "id": "day_lang",
                "type": "combo",
                "options": [
                    { "中文": "zh" },
                    { "英文": "en" }
                ],
                "condition": "panel_cal$type.value == true && panel_cal$show_week.value == true",
                "value": "zh"
            }
        ]
    }, {
        "name": "音效視覺化",
        "id": "audv",
        items: []
    }, {
        "name": "標誌",
        "id": "logo",
        "class": "panel",
        "hide": [
            "bg_color",
            "bg_blur",
            "bg_blur_opc",
        ],
        "rep": {
            "shadow_type": { value: "drop_shadow" },
            "bg": {
                "name": "&emsp;圖片設置",
                "id": "image",
                "type": "file",
                "value": "",
                "condition": "panel_logo$type.value==true"
            },
            "bg_img": {
                "name": "&emsp;圖片大小<sub>%</sub>",
                "id": "image_size",
                "type": "slider",
                "max": 150,
                "min": 0,
                "value": 50,
                "condition": "panel_logo$type.value==true"
            },
            "border": {
                "value": false
            }
        },
        items: []
    }, {
        "name": "其他",
        "id": "other",
        items: []
    }
];
