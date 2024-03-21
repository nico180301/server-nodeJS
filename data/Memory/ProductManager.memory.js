const crypto = require("crypto")

class ProductManager {
    static #products = [];
    create(data) {
        try {
            const product = {
                id: crypto.randomBytes(12).toString("hex"),
                title: data.title,
                photo: data.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
                category: data.category,
                price: data.price,
                stock: data.stock,
            };
            if (!data.stock || !data.title || !data.category || !data.price) {
                console.log("Producto no creado, ingrese los datos solicitados.");
            } else {
                ProductManager.#products.push(product);
                console.log("Producto creado");
            }
        } catch (error) {
            console.log(error);
        }
    }
    read() {
        try {
            const products = ProductManager.#products;
            if (!products) {
                throw new Error("ERROR EN LA LECTURA DEL ARRAY");
            } else {
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    redOne(id) {
        try {
            const product = ProductManager.#products.find((each) => each.id === id);
            if (!product) {
                throw new Error("NO EXISTE EL PRODUCTO");
            } else {
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id) {
        try {
            const filtered = ProductManager.#products.filter(
                (each) => each.id !== id
            );
            if (!id) {
                throw new Error("NO EXISTE PRODUCTO CON ESE ID");
            } else {
                ProductManager.#products = filtered;
                console.log("PRODUCTO" + id + " ELIMINADO");
            }
        } catch (error) {
            console.log(error);
        }
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

productos.create({
    photo: "gabinete.jpg",
    title: "Gabinete CoolerMaster",
    category: "Gbinetes",
    price: 10,
    stock: 100,
});

productos.create({
    photo: "tecladomecanico.jpg",
    title: "Tecldo HyperX",
    category: "Teclados",
    price: 10,
    stock: 100,
});

productos.create({
    photo: "mouse.jpg",
    title: "Mouse HyperX",
    category: "Mouses",
    price: 10,
    stock: 100,
});

productos.create({
    photo: "auriculares.jpg",
    title: "Auriculares HyperX",
    category: "Auriculres",
    price: 10,
    stock: 100,
});

productos.create({
    photo: "monitor.jpg",
    title: "Monitor Samsung",
    category: "Monitores",
    price: 10,
    stock: 100,
});

console.log(productos.read());
