window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');

        }

    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }


        }


    });

    //Timer

    let deadline = '2019-1-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),


            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));


        return {

            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),

            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {

            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num
                }
            }
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);

                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }




        }

    }

    setClock('timer', deadline);



    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

    let message = { // создаём обьект который будет передавать в формате текста// обьект с сообщениями
        loading: 'Загрузка...', // эта строка будет показыватьть когда наша строка пока не обработалась
        success: 'Спасибо! Скоро мы с вами свяжемся !', // это строка которая благодарит пользователя который оставил заявку
       failure: 'Что-то пошло не так...' // строка которая говарит что то пошло не так
    };
    let form = document.getElementById('form'), //вызываем форму обратной связи 
        input = form.getElementsByTagName('input'), //вызываем input формы обратной связи
        statusMessage = document.createElement('div'); //создаём новый div на странице
    
    statusMessage.classList.add('status'); // добавляем класс элементу div

    form.addEventListener('submit', function (event) { // мы вешаем обработчик событий на форму которую вызвали (form) не на кнопку а на форму которая отправляет данные который ввел пользоватеть
        event.preventDefault(); // отменяем стандартное поведение браузера принабирании в форме страница перезагружается
        form.appendChild(statusMessage); //добавляем новый div в форму обратного вызова

        let request = new XMLHttpRequest(); //создаём запрос чтобы отпраавить данные на сервер
        // настраиваем запрос
        request.open('POST', 'server.php'); //1 что вводим каким запросом будем отправлять 2 куда отправлять данные
       // закомментировал после 18 минуты 11 урок request.setRequestHeader('Content-Type', 'application/x-form-urlencoded'); //запрос к серверу 1 задаём метод обращения 2 аргументом задаём куда обращатся к форме 
       request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //запрос к серверу 1 задаём метод обращения 2 аргументом задаём куда обращатся в кадировке  charset=utf-8
   
        let formData = new FormData(form); // поместим все что написал пользователь
        
        let obj = {}; // в который поместив все данные которые ввел пользователь
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);  //метод stringify превращает из обычных js фармав превращает в JSON формат
        
        
        
        request.send(json); // он запускает запрос и обращается к серверу


        request.addEventListener('readystatechange', function () { // это прописывается чтобы наблюдать за состоянием наших запросов
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }

        });

         for (let i = 0; i < input.length; i++) {// перещитываем все input 
             input[i].value = ''; //для отчистки всех input

         }

    });/* */

    // Form 1

    let message1 = {
        loading: 'Загрузка...', 
        success: 'Спасибо! Скоро мы с вами свяжемся !',
       failure: 'Что-то пошло не так...' 
    };
    let form1 = document.getElementById('form'), 
        input1 = form1.getElementsByTagName('input'), 
        statusMessage1 = document.createElement('div'); 
    
    statusMessage1.classList.add('status'); 

    form1.addEventListener('submit', function (event) {
        event.preventDefault(); 
        form1.appendChild(statusMessage1); 

        let request1 = new XMLHttpRequest();
        request1.open('POST', 'server.php');
        request1.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   
        let formData1 = new FormData(form1); 
        
        let obj1 = {};
        formData1.forEach(function(value, key) {
            obj1[key] = value;
        });
        let json1 = JSON.stringify(obj1);  
        
        
        
        request1.send(json1);


        request1.addEventListener('readystatechange', function () {
            if (request1.readyState < 4) {
                statusMessage1.innerHTML = message1.loading;
            } else if (request1.readyState === 4 && request1.status == 200) {
                statusMessage1.innerHTML = message1.success;
            } else {
                statusMessage1.innerHTML = message1.failure;
            }

        });

         for (let i = 0; i < input1.length; i++) { 
             input1[i].value = ''; 

         }

    });/* */
});