// displayDishes.js

import { menu } from './main.js';

export function displayDishes(dishes) {
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    const soupContainer = document.querySelector('section:nth-of-type(1) .dish_block');
    const mainContainer = document.querySelector('section:nth-of-type(2) .dish_block');
    const saladsContainer = document.querySelector('section:nth-of-type(3) .dish_block');
    const drinkContainer = document.querySelector('section:nth-of-type(4) .dish_block');
    const dessertsContainer = document.querySelector('section:nth-of-type(5) .dish_block');

    const soupHeader = document.querySelector('section:nth-of-type(1) .dish_header');
    const mainHeader = document.querySelector('section:nth-of-type(2) .dish_header');
    const saladsHeader = document.querySelector('section:nth-of-type(3) .dish_header');
    const drinkHeader = document.querySelector('section:nth-of-type(4) .dish_header');
    const dessertsHeader = document.querySelector('section:nth-of-type(5) .dish_header');

    const createDishKind = (kinds, category) => {
        const nav = document.createElement('nav');
        nav.className = 'dish_btns';

        const cheange_kind = (event) => {
            const buttons = nav.querySelectorAll(`.${category}`);
            buttons.forEach(button => {
                button.style.backgroundColor = ''; // Сбрасываем цвет
            });

            if (kinds.State != event.target.name) {
                kinds.State = event.target.name;
                event.target.style.backgroundColor = "lightgreen";
            } else kinds.State = '';

            soupContainer.innerHTML = "";
            mainContainer.innerHTML = "";
            saladsContainer.innerHTML = "";
            drinkContainer.innerHTML = "";
            dessertsContainer.innerHTML = "";
            insert_cards();
            btn_order_update();
        };

        kinds.Btns.forEach(word => {
            const btn = document.createElement('button');
            btn.style.padding = "5px";
            btn.style.borderRadius = "15px";
            btn.classList.add('dish_nav_button');
            btn.classList.add(category);
            btn.addEventListener('click', cheange_kind);
            btn.name = word;
            btn.innerHTML = word;
            nav.appendChild(btn);
        });

        return nav;
    };

    const createDishCard = (dish) => {
        const card = document.createElement('div');
        card.className = 'dish_container';
        card.dataset.dish = dish.keyword;
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish_image">
            <p class="dish_price">Цена: ${dish.price} руб.</p>
            <p class="dish_title">${dish.name}</p>
            <p class="dish_weight">Вес: ${dish.count}</p>
            <button class="dish_button">Заказать</button>
        `;
        return card;
    };

    const insert_cards = () => {
        sortedDishes.forEach(dish => {
            const card = createDishCard(dish);
            if (dish.category === 'soup') {
                if ((menu.soup.State && dish.kind == menu.soup.State) || !menu.soup.State)
                    soupContainer.appendChild(card);
            } else if (dish.category === 'main_course') {
                if ((menu.main_course.State && dish.kind == menu.main_course.State) || !menu.main_course.State)
                    mainContainer.appendChild(card);
            } else if (dish.category === 'salads_starters') {
                if ((menu.salads_starters.State && dish.kind == menu.salads_starters.State) || !menu.salads_starters.State)
                    saladsContainer.appendChild(card);
            } else if (dish.category === 'beverages') {
                if ((menu.beverages.State && dish.kind == menu.beverages.State) || !menu.beverages.State)
                    drinkContainer.appendChild(card);
            } else if (dish.category === 'desserts') {
                if ((menu.desserts.State && dish.kind == menu.desserts.State) || !menu.desserts.State)
                    dessertsContainer.appendChild(card);
            }
        });
    };

    insert_cards();
    soupHeader.appendChild(createDishKind(menu.soup, 'soup'));
    mainHeader.appendChild(createDishKind(menu.main_course, 'main_course'));
    saladsHeader.appendChild(createDishKind(menu.salads_starters, 'salads_starters'));
    drinkHeader.appendChild(createDishKind(menu.beverages, 'beverages'));
    dessertsHeader.appendChild(createDishKind(menu.desserts, 'desserts'));
}
