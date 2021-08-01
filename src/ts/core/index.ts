import settings from './settings'
import popups from './popups'
import plane from './plane'

const core = class {
    constructor(){
        this.settings = settings
        this.plane = plane
        this.popups = popups

        //初始化
        this.popups.init()
    }
    settings:typeof settings
    popups:typeof popups
    plane:typeof plane
    
    about = function(){
        console.groupCollapsed('|Desktop For You|')
        console.log("|Name|精緻桌布",)
        console.log("|Author|xiao_e_yun")
        console.log("|License|BSD-3-Clause")
        console.log("|Repository|https://github.com/xiao-e-yun/desktop-for-you")
        console.groupEnd()
    }
}
export default core