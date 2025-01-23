import { createPText } from '../lanch/combo_block.js';
import { date_to_human_readable } from "./orders_page.js"


export const viewOrderModal = (dishes, id) => {
    if (!id || !dishes) return

    try {
        const thisOrder = JSON.parse(localStorage.getItem(`${id}_pushed_order`));
        const orderModal = document.querySelector('.modal[id="viewOrderModal"]')
        orderModal.style.display = 'flex';

        const order_date = document.querySelector('.order_date'),
            client_name = document.querySelector('.client_name'),
            order_place = document.querySelector('.order_place'),
            order_time = document.querySelector('.order_time'),
            client_tel = document.querySelector('.client_tel'),
            client_mail = document.querySelector('.client_mail'),
            client_comment = document.querySelector('.client_comment'),
            order_content = document.querySelector('.order_content'),
            order_sum = document.querySelector('.order_sum')

        order_date.innerHTML = `<strong>Дата оформления:</strong> <pre> ${date_to_human_readable(thisOrder['order_date'])}`
        client_name.innerHTML = `<strong>Имя получателя:</strong> <pre> ${thisOrder['name']}`
        order_place.innerHTML = `<strong>Адрес доставки:</strong> <pre> ${thisOrder['address']}`
        order_time.innerHTML = `<strong>Время доставки:</strong> <pre> ${thisOrder['delivery-time']}`
        client_tel.innerHTML = `<strong>Телефон:</strong> <pre> ${thisOrder['phone']}`
        client_mail.innerHTML = `<strong>Email:</strong> <pre> ${thisOrder['email']}`
        client_comment.innerHTML = `<strong>Комментарий:</strong> <pre> ${thisOrder['customer-comment']}`
        order_sum.innerHTML = `<strong>Стоимость:</strong> <pre> ${thisOrder['sum']}₽`

        const food_arr = id_to_names(thisOrder, dishes)
        for (let i = 0; i < food_arr.length; i++) {
            let p = document.createElement('p')
            p.innerHTML = food_arr[i]
            order_content.appendChild(p)
        }

    } catch (error) {
        console.error(error);

    }
}

export const editOrderModal = (dishes, id) => {
    if (!id || !dishes) return

    try {
        const thisOrder = JSON.parse(localStorage.getItem(`${id}_pushed_order`));

        const orderModal = document.querySelector('.modal[id="editOrderModal"]')
        orderModal.style.display = 'flex';

        const client_name = document.querySelector('.input-field.name'),
            order_place = document.querySelector('.input-field.address'),
            order_time = document.querySelector('.input-field.time'),
            client_tel = document.querySelector('.input-field.tel'),
            client_mail = document.querySelector('.input-field.email'),
            client_comment = document.querySelector('.input-field.comment'),
            order_content = document.querySelector('.edit_order_content'),
            order_sum = document.querySelector('.edit_order_sum')

        client_name.value = thisOrder['name']
        order_place.value = thisOrder['address']
        order_time.value = thisOrder['delivery-time']
        client_tel.value = thisOrder['phone']
        client_mail.value = thisOrder['email']
        client_comment.value = thisOrder['customer-comment']

        let tmp_p = document.createElement('p');
        tmp_p.textContent = `${thisOrder['sum']}₽`
        order_sum.insertAdjacentElement('afterend', tmp_p)


        const food_arr = id_to_names(thisOrder, dishes)
        for (let i = 0; i < food_arr.length; i++) {
            let p = document.createElement('p')
            p.innerHTML = food_arr[i]
            order_content.appendChild(p)
        }
        // Обработчик отправки формы
        const form_button = document.querySelector('.modal.order-form');

        form_button.addEventListener('submit', async (event) => {
            event.preventDefault(); // Останавливаем стандартное поведение формы

            const formData = new FormData(event.target); // Получаем данные формы

            thisOrder['name'] = client_name.value
            thisOrder['address'] = order_place.value
            thisOrder['delivery-time'] = order_time.value
            thisOrder['phone'] = client_tel.value
            thisOrder['email'] = client_mail.value
            thisOrder['customer-comment'] = client_comment.value

            // Добавляем выбранные блюда в данные формы
            for (let dish of Object.keys(thisOrder))
                formData.append(dish, thisOrder[dish]);
            formData.append('order_date_change', new Date().toISOString())

            try {
                // Отправляем данные на сервер с использованием fetch
                const response = await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok)
                    throw new Error(`Ошибка HTTP: ${response.status}`);

                const result = await response.json();
                console.log('Данные успешно отправлены:', result);

                orderModal.style.display = 'none';
                localStorage.setItem(`${id}_pushed_order`, JSON.stringify(thisOrder))

            } catch (error) {
                alert('Ошибка при отправке данных:', error);
                console.error('Ошибка при отправке данных:', error);
            }

        });

    } catch (error) {
        console.error(error);

    }
}

export const deleteOrderModal = (dishes, id) => {
    if (!id || !dishes) return

    const orderModal = document.querySelector('.modal[id="deleteOrderModal"]')
    orderModal.style.display = 'flex';

    orderModal.addEventListener('submit', async (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение формы

        const formData = new FormData(event.target); // Получаем данные формы

        formData.append('order_date_change', new Date().toISOString())
        formData.append('PUT', "Delete Order")

        try {
            // Отправляем данные на сервер с использованием fetch
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok)
                throw new Error(`Ошибка HTTP: ${response.status}`);

            const result = await response.json();
            console.log('Данные успешно отправлены:', result);

            orderModal.style.display = 'none';

            localStorage.removeItem(`${id}_pushed_order`)
            const row = document.querySelector(`.order_table_row[id="${id}"]`);
            row ? row.remove() : null

        } catch (error) {
            alert('Ошибка при отправке данных:', error);
            console.error('Ошибка при отправке данных:', error);
        }
    })

}

const id_to_names = (object, dishes) => {
    let res = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) { // Проверяем, что свойство принадлежит объекту
            const now_dish = dishes.find(object => object.category == key)
            if (now_dish)
                res.push(`<strong>${createPText(now_dish.category)}</strong> <pre> ` + now_dish.name + ' ' + now_dish.price + '₽')
        }
    }
    return res
}