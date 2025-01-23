// orderForm.js

import { menu, selectedDishes } from '../main.js'; // Импортируем menu и dishes
import { inputPopupText } from '../place_order/notification.js';

export const btn_order_update = (dishes) => {  // Принимаем dishes как параметр

    document.querySelectorAll('.dish_button').forEach(button => {
        button.addEventListener('click', (event) => {
            const dishCard = event.target.closest('.dish_container');
            const dishKeyword = dishCard.dataset.dish;

            const selectedDish = dishes.find(dish => dish.keyword === dishKeyword); // Используем dishes

            if (selectedDish) {
                // console.log(selectedDish);
                // console.log(menu);

                menu[selectedDish.category].selected = true;
                menu[selectedDish.category].now_dish = dishKeyword;

                selectedDishes[selectedDish.category] = selectedDish;

                localStorage.setItem(selectedDish.category, [selectedDish.keyword, selectedDishes[selectedDish.category].price])
                updateOrderDisplay();  // Функция обновления отображения заказа
            }
        });
    });
};

export const updateOrderDisplay = () => {

    const order_footer = document.querySelector('.order_prise')
    let order_res = document.querySelector('.order_prise p')

    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Получаем ключ по индексу
        if (key.indexOf("pushed_order") != -1) continue
        let value = localStorage.getItem(key); // Получаем значение по ключу
        value = value.split(",")
        if (value[1]) sum += Number(value[1])
    }
    if (sum > 0) {
        order_footer.style.display = 'flex'
        order_res.textContent = `Итог: ${sum}`
    }
    else order_footer.style.display = 'none'

    order_sum_btn(!inputPopupText())
}


const order_sum_btn = (can) => {
    // Находим ссылку <a> с классом 'order_prise_btn'
    const link = document.querySelector('.order_prise_btn');

    if (link) {
        if (!can) {
            // Если can === false, блокируем нажатие
            link.classList.add("disable")
            link.addEventListener('click', preventDefaultAction);
        } else {
            // Если can === true, удаляем блокировку
            link.classList = "order_prise_btn"
            link.removeEventListener('click', preventDefaultAction);
        }
    }
};

// Функция блокировки поведения
const preventDefaultAction = (event) => {
    event.preventDefault(); // Блокируем стандартное поведение ссылки
    console.log('Ссылка заблокирована');
};