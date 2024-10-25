// orderValidation.js

// Проверка перед отправкой формы
document.querySelector('.order-form').addEventListener('submit', function (event) {
    // Получаем элементы заказов по категориям
    const soupOrder = document.getElementById('soup-order').textContent;
    const mainOrder = document.getElementById('main-order').textContent;
    const drinkOrder = document.getElementById('drink-order').textContent;

    // Проверяем, выбрано ли хотя бы одно блюдо
    const isAnyDishSelected = soupOrder !== 'Ничего не выбрано' ||
        mainOrder !== 'Ничего не выбрано' ||
        drinkOrder !== 'Ничего не выбрано';
    // console.log(isAnyDishSelected, "isAnyDishSelected");

    // Если ни одно блюдо не выбрано, выводим сообщение и останавливаем отправку
    if (!isAnyDishSelected)
        event.preventDefault(); // Останавливаем отправку формы

});
