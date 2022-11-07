'use strict';

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

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
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
    showTabContent();


    //Timer

    const deadline = '2022-10-12';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

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


    setClock('.timer', deadline);



    //Modal

    const modalBtns = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal');


    // Создание модального окна с помощью инлайн стилей:
    // modalBtns.forEach((btn) => {
    //     btn.addEventListener('click', () => {
    //         modalWindow.style.display = 'block';
    //     });
    // });
    // modalCloseBtn.addEventListener('click', () => {
    //     modalWindow.style.display = 'none';
    // });


    // Создание модального окна с помощью переключения классов:

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

    // //Добавляем функционал закрытия модального окна при щелчке на подложку окна:
    // modalWindow.addEventListener('click', (e) => {
    //     if (e.target === modalWindow) {
    //         modalWindow.classList.toggle('show');
    //         document.body.style.overflow = '';
    //     }
    // });



    // Создание модального окна с вынесением повторяющихся действий в функцию:

    function openModalWindow() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        // clearTimeout(modalTimerId);
    }

    modalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModalWindow();
        });
    });

    function closeModalWindow() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    modalCloseBtn.addEventListener('click', closeModalWindow);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });


    //Устанавливаем таймер на модальное окно

    // const modalTimerId = setTimeout(openModalWindow, 3000);

    //Вызываем модальное окно, когда пользователь полностью прокрутил страницу

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModalWindow();
            removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);


    // Создание карточек меню с помощью классов

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
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
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container',
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню "Постное"`,
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        16,
        '.menu .container',
        "menu__item"
    ).render();

    
});