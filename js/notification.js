import { menu } from './main.js';

document.addEventListener('DOMContentLoaded', () => {

    let popupText = document.querySelector('.popup p')

    const inputPopupText = () => {
        let state = 0;
        if (!menu.desserts.selected && !menu.beverages.selected && !menu.main_course.selected && !menu.salads_starters.selected && !menu.soup.selected) {
            popupText.textContent = "Ничего не выбрано. Выберите блюда для заказа"
            state = 1
        }

        else if (!menu.beverages.selected) {
            if (menu.main_course.selected || (menu.soup.selected && menu.salads_starters.selected)) {
                popupText.textContent = "Выберите напиток"
                state = 1
            }
        }

        else if ((menu.desserts.selected || menu.beverages.selected) && !menu.main_course.selected) {
            popupText.textContent = "Выберите главное блюдо"
            state = 1
        }

        else if ((!menu.main_course.selected && !menu.salads_starters.selected) && menu.soup.selected) {
            popupText.textContent = "Выберите главное блюдо/салат/стартер"
            state = 1
        }

        else if (!menu.main_course.selected && !menu.soup.selected && menu.salads_starters.selected) {
            popupText.textContent = "Выберите суп или главное блюдо"
            state = 1
        }
        if (state == 0) popupText.textContent = "Непредвиденная комбинация"
        return state;
    }
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

        // Проверка на ошибку с помощью inputPopupText
        if (inputPopupText() == 1) {
            notification.style.display = 'block';
        } else {
            const formData = new FormData(event.target); // Получаем данные формы
            const menu_keys = Object.keys(menu);

            // Добавляем выбранные блюда в данные формы
            for (let dish of menu_keys)
                if (menu[dish].now_dish)
                    formData.append('food', menu[dish].now_dish);

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

            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
            }
        }
    });

})