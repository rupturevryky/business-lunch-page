export const place_order = (dishes) => {

    const textarea = document.getElementById('customer-comment');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        if (this.scrollHeight < 400)
            this.style.height = this.scrollHeight + 'px';
        else
            this.style.height = 400 + 'px';
    });


    set_order_cards(dishes)
    set_form_food(dishes)
}

const set_form_food = (dishes) => {

    const orderCostDisplay = document.querySelector('#order-cost');
    let somethingSelected = false;

    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Получаем ключ по индексу
        if (key.indexOf('pushed_order') != -1) continue
        let value = localStorage.getItem(key); // Получаем значение по ключу
        value = value.split(",")

        if (value[1]) sum += Number(value[1])

        const displayElement = document.querySelector(`#${key}-order`);

        // Если блюдо выбрано, показываем его, иначе показываем текст "Блюдо не выбрано"
        if (value[0]
            // && value[0] != "[object Object]"
        ) {
            let name = undefined;
            if (value[0] != "NULL" && value[0].indexOf("[object") == -1) {

                name = dishes.find(item => item.keyword == value[0]);
                name = name.name;

                document.querySelector('.nothing-selected').style.display = "none";
            }

            let dish;
            if (key == "soup") dish = "Суп"
            if (key == "main-course") dish = "Главное блюдо"
            if (key == "drink") dish = "Напиток"
            if (key == "salad") dish = "Салат или стартер"
            if (key == "dessert") dish = "Десерт"
            if (name) {
                displayElement.innerHTML = `<strong>${dish}:<br></strong> ${name} ${value[1]}₽`
                displayElement.style.display = 'block'; // Отображаем категорию
                somethingSelected = true; // Помечаем, что хотя бы одно блюдо выбрано
            }
            else if (dish && displayElement) {
                displayElement.innerHTML = `<strong>${dish}:<br></strong> Ничего не выбрано`
                displayElement.style.display = 'none'
            }

        }
    }

    // Если ни одно блюдо не выбрано, отображаем сообщение "Ничего не выбрано"
    if (!somethingSelected) removeAllFoodOrder()

    // Обновляем итоговую стоимость заказа
    if (sum > 0) {
        orderCostDisplay.textContent = `Стоимость заказа: ${sum}₽`;
        orderCostDisplay.style.display = 'block'; // Показать стоимость, если есть сумма
    } else {
        orderCostDisplay.style.display = 'none'; // Скрыть стоимость, если сумма 0
    }
}

export const removeAllFoodOrder = () => {
    const customerComment = document.querySelector('.customer-comment');

    document.querySelector('.dish_block').innerHTML = ``

    document.querySelectorAll('.order-category').forEach(key => {
        key.style.display = 'none'; // Скрываем все категории
    });
    document.querySelector('#order-cost').style.display = 'none'; // Скрываем стоимость

    if (!document.querySelector('.nothing-selected')) {
        customerComment.insertAdjacentHTML('beforebegin', `<p class="nothing-selected"><br>Ничего не выбрано</p>`);
    } else document.querySelector('.nothing-selected').style.display = "block"

    const resetLocalStorage = () => {
        // const max_steps = localStorage.length;
        for (let i = 0; i < localStorage.length;) {
            const key = localStorage.key(i); // Получаем ключ по индексу
            if (key.indexOf("pushed_order") == -1)
                localStorage.removeItem(key); // Получаем значение по ключу
            else i++;
        }
        // localStorage.length > 0 ? resetLocalStorage() : null
    }
    resetLocalStorage()
}

const set_order_cards = (dishes) => {
    const Container = document.querySelector('.dish_block');

    const createDishCard = (dish, key) => {
        if (dish) {
            // Создаём контейнер карточки
            const card = document.createElement('div');
            card.className = 'dish_container';
            card.dataset.dish = dish.keyword;

            // Вставляем HTML содержимое
            card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish_image">
            <p class="dish_price">Цена: ${dish.price} руб.</p>
            <p class="dish_title">${dish.name}</p>
            <p class="dish_weight">Вес: ${dish.count}</p>
            <button class="dish_button" data-action="delete">Удалить</button>
        `;

            // Добавляем обработчик на кнопку "Удалить"
            const deleteButton = card.querySelector('[data-action="delete"]');
            deleteButton.addEventListener('click', () => {
                card.remove(); // Удаляем карточку
                // localStorage.removeItem(key)
                localStorage.setItem(key, 'NULL,0')
                set_form_food(dishes)
            });
            Container.appendChild(card)
        }
    };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Получаем ключ по индексу
        let value = localStorage.getItem(key); // Получаем значение по ключу
        value = value.split(",")
        if (value && value != "NULL,0"
            // && value[0] != "[object Object]"

        ) {
            createDishCard(dishes.find(item => item.keyword == value[0]), key)
        }
    }
};


