document.addEventListener('DOMContentLoaded', () => {

    let popupText = document.querySelector('.popup p')

    const inputPopupText = () => {
        let state = 0;
        if (!menu.desserts.selected && !menu.beverages.selected && !menu.main_course.selected && !menu.salads_starters.selected && !menu.soup.selected) {
            popupText.textContent = "Ничего не выбрано. Выберите блюда для заказа"
            state = 1
        }

        if (!menu.beverages.selected) {
            if (menu.main_course.selected || (menu.soup.selected && menu.salads_starters.selected)) {
                popupText.textContent = "Выберите напиток"
                state = 1
            }
        }

        if ((menu.desserts.selected || menu.beverages.selected) && !menu.main_course.selected) {
            popupText.textContent = "Выберите главное блюдо"
            state = 1
        }

        if ((!menu.main_course.selected && !menu.salads_starters.selected) && menu.soup.selected) {
            popupText.textContent = "Выберите главное блюдо/салат/стартер"
            state = 1
        }

        if (!menu.main_course.selected && !menu.soup.selected && menu.salads_starters.selected) {
            popupText.textContent = "Выберите суп или главное блюдо"
            state = 1
        }
        if (state == 0) popupText.textContent = "Непредвиденная комбинация"
        return state;
    }
    inputPopupText()

    const notification = document.querySelector('.notification');
    const allNotifBtns = document.querySelectorAll('.displayNotification');
    const closePopup = () => {
        notification.style.display = 'none';
    };
    allNotifBtns.forEach(button =>
        button.addEventListener('click', closePopup)
    )

    const form_button = document.querySelector('.order-form')
    form_button.addEventListener('submit', (event) => {
        if (inputPopupText() == 1) {
            event.preventDefault()
            notification.style.display = 'block';
        } else {
            event.preventDefault();

            const formData = new FormData(event.target);
            const menu_keys = Object.keys(menu);
            for (let dish of menu_keys) if (menu[dish].now_dish) formData.append('food', menu[dish].now_dish);

            // Пример отправки данных на сервер с использованием fetch
            fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData
            })
        }
    })

})