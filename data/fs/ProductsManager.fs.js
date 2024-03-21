const fs = require("fs");
const crypto = require("crypto");

class UserManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo creado");
        } else {
            console.log("Archivo existente");
        }
    }
    async create(data) {
        try {
            const user = {
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
                let products = await fs.promises.readFile(this.path, "utf-8");
                products = JSON.parse(products);
                products.push(user);
                console.log("Producto creado.");
                products = JSON.stringify(products, null, 2);
                await fs.promises.writeFile(this.path, products)
            }
        } catch (error) {
            console.log(error);
        }

    }
    async read() {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            if (!products) {
                new Error("Error en la lectura del array");
            } else {
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            const product = products.find((each) => each.id === id);
            if (!product) {
                throw new Error("NO EXISTE EL PRODUCTO.");
            }
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            const filtered = products.filter((each) => each.id !== id);
            if (!id) {
                throw new Error("NO EXISTEN EL PRODUCTO CON ESE ID");
            } else {
                await fs.promises.writeFile(filtered);
                console.log("PRODUCTO " + id + " ELIMINADO");
            }
        } catch (error) {
            console.log(error);
        }
    }


}

async function test() {
    const productos = new UserManager();
    await productos.create({
        photo: "ryzen.jpg",
        title: "Ryzen",
        category: "CPU",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "mother.jpg",
        title: "Motherboard",
        category: "Motherboards",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "ram.jpg",
        title: "Memory Ram",
        category: "RAM",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "nvidia.jpg",
        title: "Nvidia 3080",
        category: "Tarjetas grafica",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "fuentedepoder.jpg",
        title: "Fuente de 600w",
        category: "Fuentes de Poder",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "gabinete.jpg",
        title: "Gabinete CoolerMaster",
        category: "Gbinetes",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "tecladomecanico.jpg",
        title: "Tecldo HyperX",
        category: "Teclados",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "mouse.jpg",
        title: "Mouse HyperX",
        category: "Mouses",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "auriculares.jpg",
        title: "Auriculares HyperX",
        category: "Auriculres",
        price: 10,
        stock: 100,
    });

    await productos.create({
        photo: "monitor.jpg",
        title: "Monitor Samsung",
        category: "Monitores",
        price: 10,
        stock: 100,
    });

    console.log(await productos.read());
    
}

test();
