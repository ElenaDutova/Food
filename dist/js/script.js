/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.matches('.tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  hideTabContent();
  showTabContent(); //Timer

  const deadline = '2022-10-12';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timerElem = document.querySelector(selector),
          daysElem = timerElem.querySelector('#days'),
          hoursElem = timerElem.querySelector('#hours'),
          minutesElem = timerElem.querySelector('#minutes'),
          secondsElem = timerElem.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const objT = getTimeRemaining(endtime);
      daysElem.innerHTML = getZero(objT.days);
      hoursElem.innerHTML = getZero(objT.hours);
      minutesElem.innerHTML = getZero(objT.minutes);
      secondsElem.innerHTML = getZero(objT.seconds);

      if (objT.total <= 0) {
        clearInterval(timeInterval);
        daysElem.innerHTML = '00';
        hoursElem.innerHTML = '00';
        minutesElem.innerHTML = '00';
        secondsElem.innerHTML = '00';
      }
    }
  }

  setClock('.timer', deadline); //Modal

  const modalBtns = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modalWindow = document.querySelector('.modal'); // ???????????????? ???????????????????? ???????? ?? ?????????????? ???????????? ????????????:
  // modalBtns.forEach((btn) => {
  //     btn.addEventListener('click', () => {
  //         modalWindow.style.display = 'block';
  //     });
  // });
  // modalCloseBtn.addEventListener('click', () => {
  //     modalWindow.style.display = 'none';
  // });
  // ???????????????? ???????????????????? ???????? ?? ?????????????? ???????????????????????? ??????????????:
  // modalBtns.forEach((btn) => {
  //     btn.addEventListener('click', () => {
  //         // modalWindow.classList.add('show');
  //         // modalWindow.classList.remove('hide');
  //         modalWindow.classList.toggle('show');
  //         document.body.style.overflow = 'hidden';
  //     });
  // });
  // modalCloseBtn.addEventListener('click', () => {
  //     // modalWindow.classList.add('hide');
  //     // modalWindow.classList.remove('show');
  //     modalWindow.classList.toggle('show');
  //     document.body.style.overflow = '';
  // });
  // //?????????????????? ???????????????????? ???????????????? ???????????????????? ???????? ?????? ???????????? ???? ???????????????? ????????:
  // modalWindow.addEventListener('click', (e) => {
  //     if (e.target === modalWindow) {
  //         modalWindow.classList.toggle('show');
  //         document.body.style.overflow = '';
  //     }
  // });
  // ???????????????? ???????????????????? ???????? ?? ???????????????????? ?????????????????????????? ???????????????? ?? ??????????????:

  function openModalWindow() {
    modalWindow.classList.toggle('show');
    document.body.style.overflow = 'hidden'; // clearTimeout(modalTimerId);
  }

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModalWindow();
    });
  });

  function closeModalWindow() {
    modalWindow.classList.toggle('show');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModalWindow);
  modalWindow.addEventListener('click', e => {
    if (e.target === modalWindow) {
      closeModalWindow();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  }); //?????????????????????????? ???????????? ???? ?????????????????? ????????
  // const modalTimerId = setTimeout(openModalWindow, 3000);
  //???????????????? ?????????????????? ????????, ?????????? ???????????????????????? ?????????????????? ?????????????????? ????????????????

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModalWindow();
      removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); // ???????????????? ???????????????? ???????? ?? ?????????????? ??????????????

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => {
          element.classList.add(className);
        });
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  new MenuCard("img/tabs/vegy.jpg", "vegy", `???????? "????????????"`, '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!', 9, '.menu .container').render();
  new MenuCard("img/tabs/elite.jpg", "elite", `???????? ????????????????????`, '?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!', 21, '.menu .container', "menu__item").render();
  new MenuCard("img/tabs/post.jpg", "post", `???????? "??????????????"`, '???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.', 16, '.menu .container', "menu__item").render();
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map