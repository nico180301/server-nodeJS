class ProductManager {
    static #products = [];
    create(data) {
        const product = {
            id:
                ProductManager.#products.length === 0
                    ? 1
                    : ProductManager.#products[ProductManager.#products.length - 1].id +
                    1,
            title: data.title,
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock,
        };
        ProductManager.#products.push(product);
        console.log("Producto creado");
    }
    read() {
        return ProductManager.#products;
    }
}

const productos = new ProductManager();
productos.create({
    photo: "ryzen.jpg",
    title: "Ryzen",
    category: "CPU",
    price: 10,
    stock: 100,
});

productos.create({
    photo: "mother.jpg",
    title: "Motherboard",
    category: "Motherboard",
    price: 10,
    stock: 100,
});
productos.create({
    photo: "ram.jpg",
    title: "Memory Ram",
    category: "RAM",
    price: 10,
    stock: 100,
});
productos.create({
    photo: "nvidia.jpg",
    title: "Nvidia 3080",
    category: "Tarjeta grafica",
    price: 10,
    stock: 100,
});
productos.create({
    photo: "fuentedepoder.jpg",
    title: "Fuente de 600w",
    category: "Fuente de Poder",
    price: 10,
    stock: 100,
});

console.log(productos.read());
