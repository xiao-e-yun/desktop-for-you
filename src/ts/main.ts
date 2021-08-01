import '../scss/main.scss'

import _core from './core'
const core = window["EY_core"] = new _core()

const info = "|window|"

core.about()
console.log(info+"使用\"EY_core\"調用\"主核心\"")

import config from './settings'

console.log('使用"open_settings()"開啟設定列表')
window["open_settings"] = function(show:boolean = false) {
    core.settings.show_settings((config as any),show)
}

window["wallpaperPropertyListener"] = {
    applyUserProperties: function(properties) {
        if (properties.show_settings){
            const value = properties.show_settings.value as boolean
            core.settings.show_settings((config as any),value)
        }
    },
}