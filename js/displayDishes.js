// displayDishes.js

document.addEventListener('DOMContentLoaded', () => {
    // Загружаем блюда и сортируем их по алфавиту
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    // Контейнеры для секций с блюдами
    const soupContainer = document.querySelector('section:nth-of-type(1) .dish_block');
    const mainContainer = document.querySelector('section:nth-of-type(2) .dish_block');
    const drinkContainer = document.querySelector('section:nth-of-type(3) .dish_block');

    // Функция для создания карточки блюда
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

    // Разделяем блюда по категориям и добавляем в соответствующие контейнеры
    sortedDishes.forEach(dish => {
        const card = createDishCard(dish);
        if (dish.category === 'soup') {
            soupContainer.appendChild(card);
        } else if (dish.category === 'main') {
            mainContainer.appendChild(card);
        } else if (dish.category === 'drink') {
            drinkContainer.appendChild(card);
        }
    });
});
