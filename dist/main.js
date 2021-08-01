/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./ts/core/index.ts":
/*!**************************!*\
  !*** ./ts/core/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./ts/core/settings.ts");
/* harmony import */ var _popups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popups */ "./ts/core/popups.ts");
/* harmony import */ var _plane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plane */ "./ts/core/plane.ts");



const core = class {
    constructor() {
        this.about = function () {
            console.groupCollapsed('|Desktop For You|');
            console.log("|Name|精緻桌布");
            console.log("|Author|xiao_e_yun");
            console.log("|License|BSD-3-Clause");
            console.log("|Repository|https://github.com/xiao-e-yun/desktop-for-you");
            console.groupEnd();
        };
        this.settings = _settings__WEBPACK_IMPORTED_MODULE_0__.default;
        this.plane = _plane__WEBPACK_IMPORTED_MODULE_2__.default;
        this.popups = _popups__WEBPACK_IMPORTED_MODULE_1__.default;
        //初始化
        this.popups.init();
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (core);


/***/ }),

/***/ "./ts/core/plane.ts":
/*!**************************!*\
  !*** ./ts/core/plane.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    core() { console.log(this); }
});


/***/ }),

/***/ "./ts/core/popups.ts":
/*!***************************!*\
  !*** ./ts/core/popups.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const $export = Object.assign(function (id, show, content, have_header, done_callback) {
    const $this = $export;
    const data = $this._data;
    //創建新的popup
    if (!(id in data)) {
        $this._new_popup(id, content, have_header, done_callback);
    }
    //設置popup的content
    else if (data[id].content !== content) {
        data[id].content = content;
        data[id].element.innerHTML = content;
    }
    //設置popup的display
    if (data[id].display !== show) {
        data[id].display = show;
        data[id].element.classList[show ? "add" : "remove"]("show");
    }
    return data[id].element;
}, {
    _new_popup(id, content, have_header, done_callback) {
        if (!content) {
            return console.error("新建的彈出視窗沒有content");
        }
        const data = $export._data;
        const popup = document.createElement('div');
        popup.id = "popup-" + id;
        let html = "";
        if (have_header) {
            html += `<header class="drag-bar"></header>`;
        }
        else {
            popup.classList.add("no-header");
        }
        html += `<main>${content}</main>`;
        debugger;
        popup.innerHTML = html;
        document.getElementById("popups").appendChild(popup);
        data[id] = {
            content: content,
            display: false,
            element: popup
        };
        const pos = popup.getBoundingClientRect();
        const style = popup.style;
        const screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screen_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        style.top = (screen_height - pos.height) / 2 + "px";
        style.left = (screen_width - pos.width) / 2 + "px";
        if (done_callback) {
            done_callback(popup);
        }
    },
    init() {
        //可拖動的彈出視窗
        const popups = document.getElementById("popups");
        popups.addEventListener("mousedown", mousedown, false);
        popups.addEventListener("mouseup", mouseup, false);
        let dragging = false;
        let targeter_parent;
        let x;
        let y;
        function mousedown(e) {
            const $targeter = e.target;
            if ($targeter.classList.contains("drag-bar")) {
                const targeter = e.target;
                targeter_parent = targeter.parentElement;
                dragging = true;
                x = (e.clientX - targeter_parent.offsetLeft);
                y = (e.clientY - targeter_parent.offsetTop);
                targeter_parent.classList.add("dragging");
                popups.addEventListener("mousemove", drag, false);
            }
        }
        function mouseup(e) {
            if (dragging) {
                dragging = false;
                targeter_parent.classList.remove("dragging");
                popups.removeEventListener("mousemove", drag);
            }
        }
        function drag(e) {
            //計算彈出視窗的位置
            targeter_parent.style.left = e.clientX - x + "px";
            targeter_parent.style.top = e.clientY - y + "px";
        }
    },
    _data: {}
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($export);


/***/ }),

/***/ "./ts/core/settings.ts":
/*!*****************************!*\
  !*** ./ts/core/settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _popups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popups */ "./ts/core/popups.ts");

const $export = Object.assign(
/**
 * @name 當設置被更新時，觸發事件
 * @param {string} key 設置的鍵
 * @param {any} value 設置的值
**/
function (key, done) {
    const $this = $export;
    $this._trigger.push({ [key]: done });
}, {
    /**
     * @name 設置新的參數
     * @argument {string} key 參數的名字
     * @argument {any} value 參數的值
     **/
    set_config(key, value, el) {
        const $this = $export;
        //如果值相同，不做任何事
        const config = $this._config;
        if (config[key] === value) {
            return;
        }
        config[key] = value;
        //查看是否有事件觸發
        const triggers = $this._trigger;
        triggers.forEach(trigger => {
            if (key in trigger) {
                trigger[key](value, el);
            }
        });
    },
    _config: {},
    _trigger: [],
    //創建HTML設置清單
    show_settings(config, show = true) {
        let html = "";
        for (const item of config) {
            if (!Array.isArray(item)) {
                html += make_html(item);
            }
            else {
                html += `<div class="setting-group">`;
                for (const setting of item) {
                    html += make_html(setting);
                }
                html += "</div>";
            }
        }
        return { html: html, fun: (self) => {
                let desc_el;
                let is_hover = false;
                self.addEventListener("mouseover", function (e) {
                    const targeter = e.target;
                    if (!(targeter.tagName === "H2" || targeter.tagName === "H1")) {
                        return;
                    }
                    desc_el = (0,_popups__WEBPACK_IMPORTED_MODULE_0__.default)("setting_desc", false, targeter.dataset.desc, false);
                    desc_el.classList.add("delay_show");
                    is_hover = true;
                });
                self.addEventListener("mouseout", function (e) {
                    const targeter = e.target;
                    if (!(targeter.tagName === "H2" || targeter.tagName === "H1")) {
                        return;
                    }
                    desc_el.classList.remove("delay_show");
                    is_hover = false;
                });
                self.addEventListener("mousemove", function (e) {
                    if (!(is_hover && desc_el)) {
                        return;
                    }
                    const style = desc_el.style;
                    style.top = (e.pageY + 10) + "px";
                    style.left = (e.pageX + 10) + "px";
                });
            } };
        function make_html(item_config) {
            //生成HTML
            let $html = `<div class="setting-item">`;
            const type = item_config.type;
            const title_tag = type === "title" ? "h1" : "h2";
            $html += `<${title_tag} data-desc="${item_config.desc.replace(/"/g, "&quot;")}">${item_config.name}</${title_tag}>`;
            if (type === "more") {
                let sel_html = "";
                for (const sel of item_config.more) {
                    sel_html += "<div></div>";
                }
                $html += `<div class="setting-more"></div><div></div>`;
            }
            else {
                $html += (type === "info" || type === "title") ? "" : `<input data-id="${item_config.id}" type="${type}">`;
            }
            $html += `</div>`;
            return $html;
        }
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($export);


/***/ }),

/***/ "./ts/settings.ts":
/*!************************!*\
  !*** ./ts/settings.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//這是設置面板的配置文件
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    [
        {
            "id": "background",
            "name": "背景",
            "desc": "顯示的背景",
            "type": "more",
            "more": [
                {
                    "name": "顏色",
                    "content": /*html*/ `<input >`
                },
                {},
                {}
            ]
        }
    ]
]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "./ts/core/index.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./ts/settings.ts");


const core = window["EY_core"] = new _core__WEBPACK_IMPORTED_MODULE_1__.default();
const info = "|window|";
core.about();
console.log(info + "使用\"EY_core\"調用\"主核心\"");

console.log('使用"open_settings()"開啟設定列表');
window["open_settings"] = function (show = false) {
    core.settings.show_settings(_settings__WEBPACK_IMPORTED_MODULE_2__.default, show);
};
window["wallpaperPropertyListener"] = {
    applyUserProperties: function (properties) {
        if (properties.show_settings) {
            const value = properties.show_settings.value;
            core.settings.show_settings(_settings__WEBPACK_IMPORTED_MODULE_2__.default, value);
        }
    },
};

})();

/******/ })()
;
//# sourceMappingURL=main.js.map