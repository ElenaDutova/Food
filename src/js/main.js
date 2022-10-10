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
});