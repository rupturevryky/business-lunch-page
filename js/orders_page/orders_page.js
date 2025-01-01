import { viewOrderModal } from './modalWindows.js';


const date_to_human_readable = (isoString) => {
    const date = new Date(isoString);

    // Получаем компоненты даты
    const day = String(date.getDate()).padStart(2, '0'); // День
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (0-11)
    const year = date.getFullYear(); // Год
    const hours = String(date.getHours()).padStart(2, '0'); // Часы (локальное время)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты (локальное время)


    // Формируем строку в нужном формате
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

const id_to_names = (object, dishes) => {
    let res = [];

    for (const key in object) {
        if (object.hasOwnProperty(key)) { // Проверяем, что свойство принадлежит объекту

            const now_dish = dishes.find(object => object.category == key)

            now_dish ? res.push(now_dish.name) : null
        }
    }
    return res.join(", ")
}

export const orders_page = (dishes) => {
    if (!dishes) return;
    const order_table = document.querySelector(".order_table")

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Получаем ключ по индексу
        if (key.indexOf("pushed_order") == -1) continue;
        let value = JSON.parse(localStorage.getItem(key)); // Получаем значение по ключу

        const now_order = document.createElement("div")
        now_order.className = "order_table_row"
        now_order.id = i + 1

        now_order.innerHTML =
            `
                <p class="leng_100">${i + 1}</p>
                <p class="leng_250">${date_to_human_readable(value.order_date)}</p>
                <p class="leng_400">${id_to_names(value, dishes)}</p>
                <p class="leng_150">${value.sum}</p>
                <p class="leng_200">${value["delivery-time"]}</p >
        <p class="leng_100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" id="${i + 1}">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16" id="${i + 1}">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" id="${i + 1}">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
        </p>
    `;
        order_table.append(now_order)
    }

    let icons = document.querySelectorAll('.bi')
    icons ? icons.forEach(icon => icon.style.cursor = 'pointer') : null

    let trashes = document.querySelectorAll('.bi-trash')
    trashes ? trashes.forEach(trash => trash.addEventListener('click', trash_handler)) : null

    let views = document.querySelectorAll('.bi-eye')
    views ? views.forEach(view => view.addEventListener('click', (event) => viewOrderModal(dishes, event.currentTarget.id))) : null

}
orders_page()

const trash_handler = (event) => {
    const id = event.currentTarget.id;
    localStorage.removeItem(`${id}_pushed_order`)
    const row = document.querySelector(`.order_table_row[id="${id}"]`);
    row ? row.remove() : null

}