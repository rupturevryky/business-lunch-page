import { menu } from '../main.js';
import { removeAllFoodOrder } from './order.js';

export const notification_func = () => {
    inputPopupText()

    const notification = document.querySelector('.notification');
    const allNotifBtns = document.querySelectorAll('.displayNotification');

    // Закрытие уведомлений по клику
    const closePopup = () => {
        notification.style.display = 'none';
    };
    allNotifBtns.forEach(button =>
        button.addEventListener('click', closePopup)
    );

    // Обработчик отправки формы
    const form_button = document.querySelector('.order-form');
    form_button.addEventListener('submit', async (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение формы

        if (inputPopupText() == 1) {
            notification.style.display = 'block';
        } else {
            const formData = new FormData(event.target); // Получаем данные формы
            let sum = 0;
            // Добавляем выбранные блюда в данные формы
            for (let dish of Object.keys(menu))
                if (localStorage.getItem(dish) && localStorage.getItem(dish) != 'NULL,0') {
                    sum += Number(localStorage.getItem(dish).split(',')[1])
                    formData.append(dish, localStorage.getItem(dish).split(',')[0]);
                }
            formData.append('order_date', new Date().toISOString())
            formData.append('sum', sum)

            try {
                // Отправляем данные на сервер с использованием fetch
                const response = await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok)
                    throw new Error(`Ошибка HTTP: ${response.status}`);

                const result = await response.json();
                console.log('Данные успешно отправлены:', result);

                // Сбрасываем форму после успешной отправки
                event.target.reset();
                // Сбрасываем localStorage после успешной отправки и удаляет блоки в форме и в заказе

                set_pushed_order(result.form)
                removeAllFoodOrder()

            } catch (error) {
                alert('Ошибка при отправке данных:', error);
                console.error('Ошибка при отправке данных:', error);
            }
        }
    });

}

export const inputPopupText = () => {

    let popupText = document.querySelector('.popup p')
    let state = 0,
        desserts = (!localStorage.getItem("desserts") || localStorage.getItem("desserts") == "NULL,0") ? false : true,
        beverages = (!localStorage.getItem("beverages") || localStorage.getItem("beverages") == "NULL,0") ? false : true,
        main_course = (!localStorage.getItem("main_course") || localStorage.getItem("main_course") == "NULL,0") ? false : true,
        salads_starters = (!localStorage.getItem("salads_starters") || localStorage.getItem("salads_starters") == "NULL,0") ? false : true,
        soup = (!localStorage.getItem("soup") || localStorage.getItem("soup") == "NULL,0") ? false : true;

    if (!desserts && !beverages && !main_course && !salads_starters && !soup) {
        if (popupText) popupText.textContent = "Ничего не выбрано. Выберите блюда для заказа"
        state = 1
    }

    else if (!beverages && (main_course || (soup && salads_starters))) {
        if (popupText) popupText.textContent = "Выберите напиток"
        state = 1

    }

    else if ((desserts || beverages) && !main_course) {
        if (popupText) popupText.textContent = !beverages ? "Выберите главное блюдо и напиток" : "Выберите главное блюдо"
        state = 1
    }

    else if ((!main_course && !salads_starters) && soup) {
        if (popupText) popupText.textContent = "Выберите главное блюдо/салат/стартер"
        state = 1
    }

    else if (!main_course && !soup && salads_starters) {
        if (popupText) popupText.textContent = "Выберите суп или главное блюдо"
        state = 1
    }
    if (state == 0) if (popupText) popupText.textContent = "Непредвиденная комбинация"

    return state;
}

const set_pushed_order = (formData) => {
    let id = 1;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Получаем ключ по индексу
        if (key.indexOf("pushed_order") == -1) continue
        let value = localStorage.getItem(key); // Получаем значение по ключу
        if (value.indexOf("[object") != -1) {
            localStorage.removeItem(key)
            continue
        }
        id++
    }
    localStorage.setItem(`${id}_pushed_order`, JSON.stringify(formData))

}