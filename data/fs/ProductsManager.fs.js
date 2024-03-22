import fs from "fs";
import crypto from "crypto";

class ProductManager {
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
    // async read(category = "all" ) {
    //     try {
    //         let products = await fs.promises.readFile(this.path, "utf-8");
    //         products = JSON.parse(products);
    //         products = products.filter(each => each.category === category)
    //         //if (!products) {
    //         if(products.length === 0){
    //             new Error("Error en la lectura del array");
    //         } else {
    //             return products;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async read(category = null) {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8");
            products = JSON.parse(products);
            
            // Si no se proporciona una categoría, devuelve todos los productos
            if (!category) {
                return products;
            } else {
                // Si se proporciona una categoría, filtra los productos por esa categoría
                const filteredProducts = products.filter(each => each.category === category);
                return filteredProducts;
            }
        } catch (error) {
            console.log(error);
            throw error;
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

// async function test() {
//     const productos = new ProductManager();
//     await productos.create({
//         photo: "ryzen.jpg",
//         title: "Ryzen",
//         category: "CPU",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "intel.jpg",
//         title: "Intel",
//         category: "CPU",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "motherAsus.jpg",
//         title: "Motherboard Asus",
//         category: "Motherboards",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "motherGigabyte.jpg",
//         title: "Motherboard Gigabyte",
//         category: "Motherboards",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "ramHyperX.jpg",
//         title: "Memory Ram HyperX",
//         category: "RAM",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "ramCorsair.jpg",
//         title: "Memory Ram Corsair",
//         category: "RAM",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "nvidia3080.jpg",
//         title: "Nvidia 3080",
//         category: "Tarjetas grafica",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "nvidia3090.jpg",
//         title: "Nvidia 3090",
//         category: "Tarjetas grafica",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "fuentedepoderXPG.jpg",
//         title: "Fuente XPG de 850w",
//         category: "Fuentes de Poder",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "fuentedepoderCorsair.jpg",
//         title: "Fuente Corsair de 1000w",
//         category: "Fuentes de Poder",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "gabineteCoolerMaster.jpg",
//         title: "Gabinete CoolerMaster",
//         category: "Gbinetes",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "gabineteCorsair.jpg",
//         title: "Gabinete Corsair",
//         category: "Gbinetes",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "tecladomecanicoHyperX.jpg",
//         title: "Tecldo HyperX",
//         category: "Teclados",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "tecladomecanicoLogitech.jpg",
//         title: "Tecldo Logitech",
//         category: "Teclados",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "mouseHyperX.jpg",
//         title: "Mouse HyperX",
//         category: "Mouses",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "mouseLogitech.jpg",
//         title: "Mouse Logitech",
//         category: "Mouses",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "auricularesHyperX.jpg",
//         title: "Auriculares HyperX",
//         category: "Auriculres",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "auricularesLogitech.jpg",
//         title: "Auriculares Logitech",
//         category: "Auriculres",
//         price: 10,
//         stock: 100,
//     });

//     await productos.create({
//         photo: "monitorSamsung.jpg",
//         title: "Monitor Samsung",
//         category: "Monitores",
//         price: 10,
//         stock: 100,
//     });
//     await productos.create({
//         photo: "monitorLG.jpg",
//         title: "Monitor LG",
//         category: "Monitores",
//         price: 10,
//         stock: 100,
//     });

//     console.log(await productos.read());
    
// }

//test();

const productManager = new ProductManager()
export default productManager