"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(name, root, $tag, properties, hide, rep) {
    const tag = $tag + "$";
    const base_condition = tag + "type.value == true";
    if (typeof hide !== "undefined" && hide.includes("type")) {
        console.log(`|- type 屬性已被無視`);
    }
    else {
        properties.set_properties(tag + "type", {
            "root": root,
            "text": "啟用" + name,
            "type": "bool",
            "value": true,
        });
    }
    for (const i of [{
            name: "bg", setting: {
                "text": "背景設置",
                "type": "combo",
                "value": "color",
                "options": [
                    { "純色": "color" },
                    { "圖片": "img" }
                ],
            }
        }, {
            name: "bg_color", setting: {
                "text": "&emsp;顏色設置",
                "type": "color",
                "value": "0 0 0",
                "condition": tag + `bg.value == "color"`
            }
        }, {
            name: "bg_img", setting: {
                "text": "&emsp;圖片設置",
                "type": "file",
                "value": "",
                "condition": tag + `bg.value == "img"`
            }
        }, {
            name: "bg_blur", setting: {
                "text": "&emsp;模糊設置<sub>px</sub>",
                "type": "slider",
                "value": 8,
                "min": 0,
                "max": 16,
                "condition": tag + `bg.value == "color"`
            }
        }, {
            name: "bg_blur_opc", setting: {
                "text": "&emsp;透明設置<sub>%</sub>",
                "type": "slider",
                "value": 20,
                "min": 0,
                "max": 100,
                "condition": tag + `bg.value == "color"`
            }
        }, {
            name: "border", setting: {
                "text": "邊框設置",
                "type": "bool",
                "value": true,
            }
        }, {
            name: "border_width", setting: {
                "text": "&emsp;邊框寬度<sub>px</sub>",
                "type": "slider",
                "value": 2,
                "min": 1,
                "max": 10,
                "condition": tag + `border.value == true`
            }
        }, {
            name: "border_opacity", setting: {
                "text": "&emsp;邊框透明度<sub>%</sub>",
                "type": "slider",
                "value": 100,
                "min": 1,
                "max": 100,
                "condition": tag + `border.value == true`
            }
        }, {
            name: "border_color", setting: {
                "text": "&emsp;邊框顏色",
                "type": "color",
                "value": "1 1 1",
                "condition": tag + `border.value == true`
            }
        }, {
            name: "pos", setting: {
                "text": "位置設置",
                "type": "combo",
                "value": "pc",
                "options": [
                    { "百分比模式": "pc" },
                    { "像素模式": "px" }
                ],
            }
        }, {
            name: "pos_pc_x", setting: {
                "text": "&emsp;左右位置<sub>%</sub>",
                "type": "slider",
                "value": 0,
                "min": 0,
                "max": 100,
                "precision": 1,
                "step": .1,
                "condition": tag + `pos.value == "pc"`
            }
        }, {
            name: "pos_pc_y", setting: {
                "text": "&emsp;上下位置<sub>%</sub>",
                "type": "slider",
                "value": 0,
                "min": 0,
                "max": 100,
                "precision": 1,
                "step": .1,
                "condition": tag + `pos.value == "pc"`
            }
        }, {
            name: "pos_px_x", setting: {
                "text": "&emsp;左右位置<sub>px</sub>",
                "type": "textinput",
                "value": "0",
                "condition": tag + `pos.value == "px"`
            }
        }, {
            name: "pos_px_y", setting: {
                "text": "&emsp;上下位置<sub>px</sub>",
                "type": "textinput",
                "value": "0",
                "condition": tag + `pos.value == "px"`
            }
        }, {
            name: "shadow_setting", setting: {
                "text": "光暈設置",
            }
        }, {
            name: "shadow_type", setting: {
                "text": "&emsp;光暈區塊",
                "type": "combo",
                "value": "box_shadow",
                "options": [
                    { "不透明區域": "drop_shadow" },
                    { "矩形區域": "box_shadow" }
                ]
            }
        }, {
            name: "shadow_size", setting: {
                "text": "&emsp;大小設置<sub>px</sub>",
                "type": "slider",
                "value": 0,
                "min": 0,
                "max": 16,
                "condition": tag + `shadow_type.value == "box_shadow"`
            }
        }, {
            name: "shadow_blur", setting: {
                "text": "&emsp;模糊設置<sub>px</sub>",
                "type": "slider",
                "value": 0,
                "max": 16,
                "min": 0,
            }
        }, {
            name: "shadow", setting: {
                "text": "&emsp;顏色",
                "type": "color",
                "value": "1 1 1",
                "condition": `(${tag}shadow_blur.value != 0 || ${tag}shadow_size.value != 0)`
            }
        }, {
            name: "full_setting", setting: {
                "text": "詳細設置",
            }
        }, {
            name: "color", setting: {
                "text": "&emsp;文字顏色",
                "type": "color",
                "value": "1 1 1",
            }
        }, {
            name: "size", setting: {
                "text": "&emsp;字體大小<sub>px</sub>",
                "type": "slider",
                "value": 50,
                "min": 12,
                "max": 150,
            }
        }]) {
        if (typeof hide !== "undefined" && hide.includes(i.name)) {
            console.log(`|- ${i.name} 屬性已被無視`);
            continue;
        }
        if (typeof rep !== "undefined" && i.name in rep) {
            const rep_item = rep[i.name];
            console.log(`|- ${i.name} 屬性已被替換` + (((i.name === rep_item.id) || (!rep_item.id)) ? "" : `為 ${rep_item.id}`));
            const $condition = (rep_item.condition || i.setting.condition);
            properties.set_properties(tag + (rep_item.id || i.name), {
                text: rep_item.name || i.setting.text,
                root: root,
                type: rep_item.type || i.setting.type,
                value: (typeof rep_item.value !== "undefined" ? rep_item.value : i.setting.value),
                //condition
                condition: base_condition + (typeof $condition === "undefined" ? "" : `&& ${$condition}`),
                //combo
                options: (typeof rep_item.options !== "undefined" ? rep_item.options : i.setting.options),
                //slider
                max: (typeof rep_item.max !== "undefined" ? rep_item.max : i.setting.max),
                min: (typeof rep_item.min !== "undefined" ? rep_item.min : i.setting.min),
                precision: (typeof rep_item.precision !== "undefined" ? rep_item.precision : i.setting.precision),
                step: (typeof rep_item.step !== "undefined" ? rep_item.step : i.setting.step),
            });
            continue;
        }
        properties.set_properties(tag + i.name, Object.assign(i.setting, {
            "root": root,
            "condition": base_condition + (typeof i.setting.condition === "undefined" ? "" : `&& ${i.setting.condition}`)
        }));
    }
    return properties;
}
exports.default = default_1;
