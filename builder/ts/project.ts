import audv from "./audv";
export default [
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
                    { "從電腦選擇": "file" },
                    { "網路上選擇<br><small>可能會被禁止訪問</small>": "url" }
                ],
                "value": "file",
                "condition": "bg$type.value == \"image\""
            }, {
                "name": "&emsp;背景大小",
                "id": "size",
                "type": "combo",
                "options": [
                    { "裁剪並保持同比例": "cover" },
                    { "縮放成螢幕比例": "100vw 100vh" },
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
    }
    ,
    {
        "name": "特效",
        "id": "fx",
        "items": [
            {
                "name": "※以下啟用功能可能會有較高占用",
                "id": "info"
            }, {
                "name": "櫻花特效",
                "id": "sakura$$type",
                "type": "bool",
                "value": false
            }, {
                "name": "&emsp;透明度<sub>%</sub>",
                "id": "sakura$$opacity",
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
                "id": "snow$$opacity",
                "type": "slider",
                "max": 100,
                "min": 0,
                "value": 15,
                "condition": "fx$snow$$type.value == true"
            }
        ]
    }
    ,
    {
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
            "options":
                [
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
            "options":
                [
                    { "12小時制": true },
                    { "24小時制": false }
                ],
            "name": "&emsp;小時格式",
            "id": "twelve_hour",
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
    }
    ,
    {
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
    }
    ,
    {
        "name": "音效視覺化",
        "id": "audv",
        //請參閱 ./audv.ts
        items: audv
    }
    ,
    {
        "name": "標誌",
        "id": "logo",
        "class": "panel",
        "default": false,
        "hide": [
            "bg_color",
            "bg_blur",
            "bg_blur_opc",
        ],
        "rep": {
            "shadow_type": { value: "drop_shadow" },
            "bg": {
                "name": "圖片設置",
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
    }
    ,
    {
        "name": "其他",
        "id": "other",
        items: [
            {
                "name": 
                `<img title="Steam/工作坊/精緻桌布" src="https://static.xiaoeyun.me/img/彈珠汽水.png" width="100%"><h4>如果喜歡桌布的話<br>請<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2440585648">Steam</a>上留言評價</h4><br>`,
                "id": "about",
            }
        ]
    }
] as Project[]

interface Panel {
    opt: ("type" | "bg" | "bg_color" | "bg_img" | "bg_blur" | "bg_blur_opc" | "border" | "border_width" | "border_opacity" | "border_color" | "pos" | "pos_pc_x" | "pos_pc_y" | "pos_px_x" | "pos_px_y" | "shadow_setting" | "shadow_type" | "shadow_size" | "shadow_blur" | "shadow" | "full_setting" | "color" | "size")
}

interface Project {
    "name": string
    "id": string
    "class"?: string
    "hide"?: Panel["opt"][]
    "rep"?: { [key: string]: Project["items"] },
    "default"?: boolean
    "items": ({
        name: string
        id: string
        type?: "text"
        value?: string
        condition?: string
        tips?: "文字模式"
    } | {
        name: string
        id: string
        type: "bool"
        value: true | false
        condition?: string
        tips?: "核取模式"
    } | {
        name: string
        id: string
        type: "combo"
        value: string
        options?: { [key: string]: string }[]
        condition?: string
        tips?: "選擇模式"
    } | {
        name: string
        id: string
        type: "textinput"
        value: string
        condition?: string
        tips?: "文字輸入模式"
    } | {
        name: string
        id: string
        type: "color"
        value: string
        condition?: string
        tips?: "顏色模式"
    } | {
        name: string
        id: string
        type: "file"
        value: ""
        condition?: string
        tips?: "檔案模式"
    } | {
        name: string
        id: string
        type: "slider"
        value: number
        max?: number
        min?: number
        precision?: number
        step?: number
        condition?: string
        tips?: "滑條模式"
    })[]
}