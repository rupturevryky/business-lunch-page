// main.js

import { loadDishes } from './loadDishes.js';
import { displayDishes } from './lanch/displayDishes.js';
import { btn_order_update, updateOrderDisplay } from './lanch/order_sum.js';

import { orders_page } from './orders_page/orders_page.js';

import { place_order } from './place_order/order.js';
import { notification_func } from './place_order/notification.js';


export let menu = {
    soup: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясной", "рыбный", "вегетарианский"]
    },
    "main-course": {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясное", "рыбное", "вегетарианское"]
    },
    salad: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["мясной", "рыбный", "вегетарианский"]
    },
    drink: {
        now_dish: '',
        selected: false,
        State: '',
        Btns: ["холодный", "горячий"],
    },
    dessert: {
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
        console.log(dishes);


        if (dishes.length > 0) {
            // Если данные загружены, отображаем блюда
            if (window.location.pathname.indexOf('lanch') > -1) {
                btn_order_update(dishes); // Передаем dishes в функцию btn_order_update
                updateOrderDisplay()
                displayDishes(dishes);
            }
            if (window.location.pathname.indexOf('place_order') > -1) {
                notification_func()
                place_order(dishes)
            }
            if (window.location.pathname.indexOf('orders_page') > -1) {
                orders_page(dishes)
            }
        } else {
            console.error('Не удалось загрузить блюда');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});
