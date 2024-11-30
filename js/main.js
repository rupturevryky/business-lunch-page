// main.js

import { loadDishes } from './loadDishes.js';
import { displayDishes } from './displayDishes.js';
import { btn_order_update } from './orderForm.js';

export let menu = {
    soup: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясной", "рыбный", "вегетарианский"]
    },
    main_course: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясное", "рыбное", "вегетарианское"]
    },
    salads_starters: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясной", "рыбный", "вегетарианский"]
    },
    beverages: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["холодный", "горячий"],
    },
    desserts: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["маленькая порция", "средняя порция", "большая порция"]
    }
};

export let dishes = []; // Экспортируем dishes
export let selectedDishes = { soup: null, main_course: null, beverages: null, salads_starters: null, desserts: null }; // Экспортируем selectedDishes

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Загружаем блюда
        dishes = await loadDishes(); // Загружаем блюда и сохраняем их в dishes

        if (dishes.length > 0) {
            // Если данные загружены, отображаем блюда
            displayDishes(dishes);
            btn_order_update(dishes); // Передаем dishes в функцию btn_order_update
        } else {
            console.error('Не удалось загрузить блюда');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});
