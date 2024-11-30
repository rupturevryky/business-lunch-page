// main.js

import { loadDishes } from './loadDishes.js';
import { displayDishes } from './displayDishes.js';

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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Загружаем блюда
        const dishes = await loadDishes();

        if (dishes.length > 0) {
            // Если данные загружены, отображаем блюда
            displayDishes(dishes);
        } else {
            console.error('Не удалось загрузить блюда');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});
