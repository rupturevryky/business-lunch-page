// orderForm.js

document.addEventListener('DOMContentLoaded', () => {
    const selectedDishes = { soup: null, main: null, drink: null };
    const orderSection = document.querySelector('.customer-order');
    const orderCostDisplay = document.createElement('div');
    orderCostDisplay.classList.add('order-cost');
    orderSection.appendChild(orderCostDisplay);

    // Обновить блок с выбранными блюдами и стоимость
    const updateOrderDisplay = () => {
        let totalCost = 0;
        ['soup', 'main', 'drink'].forEach(category => {
            const selectedDish = selectedDishes[category];
            const displayElement = document.querySelector(`#${category}-order`);
            if (selectedDish) {
                displayElement.textContent = `${selectedDish.name}: ${selectedDish.price} руб.`;
                totalCost += selectedDish.price;
            } else {
                displayElement.textContent = `${category === 'drink' ? 'Напиток' : 'Блюдо'} не выбрано`;
            }
        });

        // Итоговая стоимость
        if (totalCost > 0) {
            orderCostDisplay.textContent = `Стоимость заказа: ${totalCost} руб.`;
            orderCostDisplay.style.display = 'block';
        } else {
            orderCostDisplay.style.display = 'none';
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
});
