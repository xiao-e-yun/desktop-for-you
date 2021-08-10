export default {
    dev:false,

    order: 1,
    properties: {} as { [key: string]: any },
    set_properties(
        key: string,
        value: {
            text: string,
            root: string,
            type?: any,
            value?: any,
            condition?: any,
            //combo
            options?: { [key: string]: string }[],
            //slider
            max?: number,
            min?: number,
            precision?: number,
            step?: number,
        }) {
        this.properties[key] = {
            "condition": `(list.value==="all" || list.value==="${value.root}") ` + ((typeof value.condition === "undefined") ? "" : "&& " + value.condition),
            "order": this.order,
            "text": value.text + (this.dev?`<sub>${key}</sub>`:''),
            "type": value.type,
            "value": value.value,
        }
        switch (value.type) {
            case "combo":
                this.properties[key].options = []
                for (const opt of value.options as { [key: string]: string }[]) {
                    const [options] = Object.entries(opt)
                    this.properties[key].options.push({
                        "label": options[0],
                        "value": options[1],
                    })
                }
                break
            case "slider":
                this.properties[key].max = value.max
                this.properties[key].min = value.min
                this.properties[key].precision = value.precision
                this.properties[key].step = value.step
                break
        }
        this.order++

        return this.set_properties
    },
    return_project(description:string,index_list: { label: string; value: string; }[]) {
        const properties = Object.assign(this.properties, {
            "list": {
                "options": index_list,
                "order": -2,
                "text": "檢視可修改の類型",
                "type": "combo",
                "value": "all"
            },
            "alignmentfliph":
            {
                "condition": "browse_settings.value == true",
                "order": -14,
                "text": "ui_browse_properties_alignment_flip_horizontally",
                "type": "bool",
                "value": false
            },
            "browse_settings":
            {
                "order": -15,
                "text": "系統配置",
                "type": "bool",
                "value": false
            },
            "schemecolor":
            {
                "condition": "dev.value == true",
                "order": 0,
                "text": "ui_browse_properties_scheme_color",
                "type": "color"
            },
            "wec_brs":
            {
                "condition": "browse_settings.value == true",
                "max": 100,
                "min": 0,
                "text": "ui_browse_properties_brightness",
                "type": "slider",
                "value": 50
            },
            "wec_con":
            {
                "condition": "browse_settings.value == true",
                "max": 100,
                "min": 0,
                "text": "ui_browse_properties_contrast",
                "type": "slider",
                "value": 50
            },
            "wec_e":
            {
                "condition": "dev.value == true",
                "type": "bool",
                "value": false
            },
            "wec_hue":
            {
                "condition": "browse_settings.value == true",
                "max": 100,
                "min": 0,
                "text": "ui_browse_properties_hue_shift",
                "type": "slider",
                "value": 50
            },
            "wec_sa":
            {
                "condition": "browse_settings.value == true",
                "max": 100,
                "min": 0,
                "text": "ui_browse_properties_saturation",
                "type": "slider",
                "value": 50
            }
        })

        return {
            "contentrating": "Everyone",
            "description":description ,
            "file": "index.html",
            "general":
            {
                "properties": properties,
                "supportsaudioprocessing": true
            },
            "preview": "preview.jpg",
            "tags": ["Relaxing"],
            "title": "精緻桌布",
            "type": "web",
            "version": 0,
            "visibility": "public",
            "workshopid": "2440585648",
            "workshopurl": "steam://url/CommunityFilePage/2440585648"
        }
    }
}