export const viewOrderModal = (dishes, id) => {
    if (!id || !dishes) return

    try {
        const thisOrder = JSON.parse(localStorage.getItem(`${id}_pushed_order`));
        console.log(thisOrder);

        const orderModal = document.querySelector('.modal[id="viewOrderModal"]')

        const order_date = document.querySelector('.order_date'),
            client_name = document.querySelector('.client_name'),
            order_place = document.querySelector('.order_place'),
            order_time = document.querySelector('.order_time'),
            client_tel = document.querySelector('.client_tel'),
            client_mail = document.querySelector('.client_mail'),
            client_comment = document.querySelector('.client_comment'),
            order_content = document.querySelector('.order_content')

    } catch (error) {
        console.error(error);

    }







}