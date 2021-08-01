const $export = Object.assign(
    function (id: string, show: boolean, content?: string, have_header?:boolean, done_callback?:(elememt: HTMLDivElement)=>void): HTMLDivElement {
        const $this = $export
        const data = $this._data
        //創建新的popup
        if (!(id in data)) {
            $this._new_popup(id, content, have_header,done_callback)
        }
        //設置popup的content
        else if (data[id].content !== content) {
            data[id].content = content
            data[id].element.innerHTML = content
        }
        //設置popup的display
        if (data[id].display !== show) {
            data[id].display = show
            data[id].element.classList[show ? "add" : "remove"]("show")
        }
        return data[id].element
    }, {
    _new_popup(id: string, content: string, have_header: boolean,done_callback?:(elememt: HTMLDivElement)=>void) {
        if (!content) { return console.error("新建的彈出視窗沒有content") }

        const data = $export._data
        const popup = document.createElement('div')
        popup.id = "popup-" + id
        let html = ""
        if(have_header){html += `<header class="drag-bar"></header>`}else{popup.classList.add("no-header")}
        html +=`<main>${content}</main>`
        debugger
        popup.innerHTML = html
        document.getElementById("popups").appendChild(popup)
        data[id] = {
            content: content,
            display: false,
            element: popup
        }

        const pos = popup.getBoundingClientRect();
        const style = popup.style

        const screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screen_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        style.top = (screen_height - pos.height) / 2 + "px"
        style.left = (screen_width - pos.width) / 2 + "px"

        if(done_callback){done_callback(popup)}
    },
    init() {
        //可拖動的彈出視窗
        const popups = document.getElementById("popups")
        popups.addEventListener("mousedown",mousedown, false)
        popups.addEventListener("mouseup", mouseup, false)
        
        let dragging = false
        let targeter_parent: HTMLDivElement
        let x: number
        let y: number
        function mousedown(e: MouseEvent){
            const $targeter = e.target as HTMLDivElement
            if ($targeter.classList.contains("drag-bar")) {
                const targeter = e.target as HTMLDivElement
                targeter_parent = targeter.parentElement as HTMLDivElement
                dragging = true
                x = (e.clientX - targeter_parent.offsetLeft)
                y = (e.clientY - targeter_parent.offsetTop)
                targeter_parent.classList.add("dragging")
                popups.addEventListener("mousemove", drag, false)
            }
        }
        function mouseup(e: MouseEvent){
            if (dragging) {
                dragging = false
                targeter_parent.classList.remove("dragging")
                popups.removeEventListener("mousemove", drag)
            }
        }
        function drag(e: MouseEvent) {
            //計算彈出視窗的位置
            targeter_parent.style.left = e.clientX - x + "px"
            targeter_parent.style.top = e.clientY - y + "px"
        }
    },
    _data: {} as unknown as {
        [id: string]: {
            content: string,
            display: boolean,
            element: HTMLDivElement
        }
    }

})
export default $export