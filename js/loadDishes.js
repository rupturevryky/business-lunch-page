// loadDishes.js

export async function loadDishes() {
    try {
        const response = await fetch('http://lab8-api.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=ee12b186-ceba-460f-9ca9-cb99bd91aedc');
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
