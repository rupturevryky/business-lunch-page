async function loadDishes() {
    try {
        const response = await fetch('http://127.0.0.1:3000/dishes');
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();

        return data.map(item => ({
            keyword: item.keyword,
            name: item.name,
            price: item.price,
            category: item.category,
            count: item.count,
            image: item.image,
            kind: item.kind
        }));
    } catch (error) {
        console.error('Ошибка загрузки данных о блюдах:', error);
        return [];
    }
}

// Экспорт переменной dishes для общего доступа
let dishes = [];

// Загрузка данных и сохранение их в dishes
loadDishes().then(loadedData => {
    dishes = loadedData;
    console.log("dishes", dishes);

});

