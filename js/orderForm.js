document.addEventListener('DOMContentLoaded', () => {
    const selectedDishes = { soup: null, main: null, drink: null };
    const orderCostDisplay = document.querySelector('#order-cost');
    const orderSection = document.querySelector('.customer-order');
    const customerComment = document.querySelector('.customer-comment');
    const textarea = document.getElementById('customer-comment');

    textarea.addEventListener('input', function () {
        // Сбрасываем высоту, чтобы корректно пересчитать
        this.style.height = 'auto';
        // Устанавливаем высоту в зависимости от содержимого
        if (this.scrollHeight < 400)
            this.style.height = this.scrollHeight + 'px';
        else
            this.style.height = 400 + 'px';
    });

    // Функция для обновления блока с выбранными блюдами и стоимостью
    const updateOrderDisplay = () => {
        let totalCost = 0;
        let somethingSelected = false;

        // Убираем сообщение "Ничего не выбрано", если оно есть
        const nothingSelectedElement = document.querySelector('.nothing-selected');
        if (nothingSelectedElement) {
            nothingSelectedElement.remove();
        }

        // Проходим по категориям: суп, главное блюдо, напиток
        ['soup', 'main', 'drink'].forEach(category => {
            const selectedDish = selectedDishes[category];
            const displayElement = document.querySelector(`#${category}-order`);

            // Если блюдо выбрано, показываем его, иначе показываем текст "Блюдо не выбрано"
            if (selectedDish) {
                displayElement.innerHTML = `<strong>${category === 'soup' ? 'Суп' : category === 'main' ? 'Главное блюдо' : 'Напиток'}:<br></strong> ${selectedDish.name} ${selectedDish.price}₽`;
                displayElement.style.display = 'block'; // Отображаем категорию
                totalCost += selectedDish.price;
                somethingSelected = true; // Помечаем, что хотя бы одно блюдо выбрано
            } else {
                // if (somethingSelected) {
                displayElement.style.display = 'block'; // Отображаем пустые категории только если что-то выбрано
                // } else {
                //     displayElement.style.display = 'none'; // Скрываем, если ничего не выбрано
                // }
            }
        });

        // Если ни одно блюдо не выбрано, отображаем сообщение "Ничего не выбрано"
        if (!somethingSelected) {
            document.querySelectorAll('.order-category').forEach(category => {
                category.style.display = 'none'; // Скрываем все категории
            });
            if (!document.querySelector('.nothing-selected')) {
                customerComment.insertAdjacentHTML('beforebegin', `<p class="nothing-selected"><br>Ничего не выбрано</p>`);
            }
        }

        // Обновляем итоговую стоимость заказа
        if (totalCost > 0) {
            orderCostDisplay.textContent = `Стоимость заказа: ${totalCost}₽`;
            orderCostDisplay.style.display = 'block'; // Показать стоимость, если есть сумма
        } else {
            orderCostDisplay.style.display = 'none'; // Скрыть стоимость, если сумма 0
        }
    };

    // Обработка выбора блюда
    document.querySelectorAll('.dish_button').forEach(button => {
        button.addEventListener('click', (event) => {
            const dishCard = event.target.closest('.dish_container');
            const dishKeyword = dishCard.dataset.dish;
            const selectedDish = dishes.find(dish => dish.keyword === dishKeyword);

            if (selectedDish) {
                selectedDishes[selectedDish.category] = selectedDish;
                updateOrderDisplay();
            }
        });
    });

    // Инициализация при загрузке страницы
    updateOrderDisplay();
});
