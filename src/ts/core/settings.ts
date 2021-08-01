import popups from "./popups"

const $export = Object.assign(
    /**
     * @name 當設置被更新時，觸發事件
     * @param {string} key 設置的鍵
     * @param {any} value 設置的值
    **/
    function (key: string, done: (value: any, el: HTMLInputElement) => void): void {
        const $this = $export
        $this._trigger.push({ [key]: done })
    }, {
    /**
     * @name 設置新的參數
     * @argument {string} key 參數的名字
     * @argument {any} value 參數的值
     **/
    set_config(key: string, value: any, el: HTMLInputElement): void {
        const $this = $export

        //如果值相同，不做任何事
        const config = $this._config
        if (config[key] === value) { return }
        config[key] = value

        //查看是否有事件觸發
        const triggers = $this._trigger
        triggers.forEach(trigger => {
            if (key in trigger) {
                trigger[key](value, el)
            }
        });
    },

    _config: {} as { [index: string]: any }, //設置的物件
    _trigger: [] as unknown as [{ [index: string]: (value: any, el: HTMLInputElement) => void }], //觸發事件的陣列

    //創建HTML設置清單
    show_settings(config: [
        setting_item | [setting_item]
    ],show:boolean = true): {html:string,fun:(self:HTMLDivElement)=>void} {
        let html = ""
        for (const item of config) {
            if (!Array.isArray(item)) {
                html += make_html(item)
            } else {
                html += `<div class="setting-group">`
                for (const setting of item) {
                    html += make_html(setting)
                }
                html += "</div>"
            }
        }
        return {html:html,fun:(self:HTMLDivElement)=>{
            let desc_el:HTMLDivElement
            let is_hover = false
            self.addEventListener("mouseover",function(e){
                const targeter = e.target as HTMLParagraphElement
                if(!(targeter.tagName === "H2" || targeter.tagName === "H1")){return}
        
                desc_el = popups("setting_desc",false,targeter.dataset.desc,false)
                desc_el.classList.add("delay_show")
                is_hover = true
            })
            self.addEventListener("mouseout",function(e){
                const targeter = e.target as HTMLParagraphElement
                if(!(targeter.tagName === "H2" || targeter.tagName === "H1")){return}
        
                desc_el.classList.remove("delay_show")
                is_hover = false
            })
            self.addEventListener("mousemove",function(e){
                if(!(is_hover && desc_el)){return}
                const style = desc_el.style
                style.top = (e.pageY + 10) + "px"
                style.left = (e.pageX + 10) + "px"
            })
        }}

        function make_html(item_config: setting_item): string {
            //生成HTML
            let $html = `<div class="setting-item">`
            const type = item_config.type
            const title_tag = type === "title"?"h1":"h2"
            $html += `<${title_tag} data-desc="${item_config.desc.replace(/"/g, "&quot;")}">${item_config.name}</${title_tag}>`
            if(type === "more"){
                let sel_html = ""
                for (const sel of item_config.more) {
                    sel_html +="<div></div>"
                }
                $html += `<div class="setting-more"></div><div></div>`
            }else{
                $html += (type === "info"||type === "title")?"":`<input data-id="${item_config.id}" type="${type}">`
            }
            $html += `</div>`
            return $html
        }
    }
})
interface setting_item {
    id: string,
    name: string,
    desc: string,
    type: "checkbox" | "color" | "file" | "number" | "text" | "info" | "title" | "more",
    more?:[{
        name:string,
        cotent:string,
    }]
}
export default $export