"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const panel_1 = require("./panel");
const properties_1 = require("./properties");
const project_1 = require("./project");
const project = project_1.default;
let properties = properties_1.default;
let index_list = [{
        "label": "全部顯示",
        "value": "all",
    }];
for (const index of project) {
    let tag = index.id;
    console.log("\n|" + index.name + ` [${tag}]`);
    //設定索引系統
    index_list.push({
        "label": index.name,
        "value": index.id,
    });
    //
    const key = "line" + index.id.toUpperCase();
    properties.set_properties(key, {
        text: "<h2>" + index.name + "設置</h2>",
        root: index.id,
    });
    //
    if (index.class) {
        tag = index.class + "_" + index.id;
        switch (index.class) {
            case "panel":
                properties = (0, panel_1.default)(index.name, index.id, tag, properties, ((typeof index.default !== "undefined") ? index.default : true), index.hide, index.rep);
                break;
        }
    }
    //
    for (const item of index.items || []) {
        const key = tag + "$" + item.id;
        properties.set_properties(key, {
            text: item.name,
            root: index.id,
            type: item.type,
            value: item.value,
            condition: item.condition || "",
            //combo
            options: item.options || undefined,
            //slider
            max: item.max || 0,
            min: item.min || 0,
            precision: item.precision || undefined,
            step: item.step || undefined,
        });
    }
    //
}
const description = `[h1]兼顧美觀和性能[/h1]
整體由可自訂性為核心
同時採用 "自動包含"
盡量降低性能損失

背景選項:
    純色
    圖片
    影片
    每日一圖 (Edge提供)

基礎選項:
    時鐘
    日曆
    音效可視化

特效選單:
    櫻花飄落
    雪花飄落

背景圖片來源:
    作者:[url=https://www.pixiv.net/users/73798]ユイザキカズヤ[/url]
    作品:[url=https://www.pixiv.net/artworks/71994556]囚われの繭[/url]

原始碼[url=https://69.run/E3xQ8X]github[/url]`;
const tips = `<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2670119805">精緻桌布v2</a>在此提供，歡迎體驗!`;
//整合
const res = properties.return_project(description, tips, index_list);
const json_path = path.resolve(__dirname, "../index/project.json");
fs.writeFile(json_path, JSON.stringify(res), (err) => {
    if (err) {
        console.error(err);
    }
});
