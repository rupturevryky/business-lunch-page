document.addEventListener('DOMContentLoaded', () => {

    const comboBlocks = document.querySelectorAll('.dish_combo .combo_block');

    const comdos = [
        ['./img/icons/soup.png', './img/icons/main.png', './img/icons/salad.png', './img/icons/drink.png'],
        ['./img/icons/soup.png', './img/icons/main.png', './img/icons/drink.png'],
        ['./img/icons/soup.png', './img/icons/salad.png', './img/icons/drink.png'],
        ['./img/icons/main.png', './img/icons/salad.png', './img/icons/drink.png'],
        ['./img/icons/main.png', './img/icons/drink.png'],
        ['./img/icons/desert.png']
    ]

    function addNewIcons(block, images) {

        // Удаляем существующие иконки
        block.innerHTML = '';

        // Добавляем новые иконки
        images.forEach(image => {

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Icon';
            img.style.width = '60px'
            div.appendChild(img);

            const p = document.createElement('p');
            p.textContent = createPText(image)
            div.appendChild(p);

            block.appendChild(div);
        });
    }

    comboBlocks.forEach((block, index) => {
        addNewIcons(block, comdos[index]);
    });
})

export const createPText = (path) => {
    if (path.indexOf("soup") > -1) return "Суп";
    else if (path.indexOf("main") > -1) return "Главное блюдо";
    else if (path.indexOf("salad") > -1) return "Салат/Стартер";
    else if (path.indexOf("drink") > -1 || path.indexOf("beverages") > -1) return "Напиток";
    else if (path.indexOf("desert") > -1 || path.indexOf("desserts") > -1) return "Десерт";
    else return "Alt";
}