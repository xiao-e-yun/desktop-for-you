"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = {
    properties: {},
    order: 1,
    set_properties(key, value) {
        this.properties[key] = {
            "condition": `(list.value==="all" || list.value==="${value.root}") ` + ((typeof value.condition === "undefined") ? "" : "&& " + value.condition),
            "order": this.properties.order,
            "text": value.text,
            "type": value.type,
            "value": value.value,
        };
        switch (value.type) {
            case "combo":
                this.properties[key].options = [];
                for (const opt of value.options) {
                    const [options] = Object.entries(opt);
                    this.properties[key].options.push({
                        "label": options[0],
                        "value": options[1],
                    });
                }
                break;
            case "slider":
                this.properties[key].max = value.max;
                this.properties[key].min = value.min;
                this.properties[key].precision = value.precision;
                this.properties[key].step = value.step;
                break;
        }
        this.properties.order++;
        return this.set_properties;
    }
};
exports.default = core;
