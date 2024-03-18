const fs = require("fs");
const crypto = require("crypto");

class UserManager {
    constructor() {
        this.path = "./data/fs/files/users.json";
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
                photo: data.photo || "https:orpomixnds.sfo3.digitaloceanspaces.com/user.jpg",
                email: data.email,
                password: data.password,
                role: 0,
            };
            if (!data.email || !data.password || !data.role) {
                console.log("Usuar no registrado. Ingrese todos los datos para crear un usuario. ");
            } else {
                let users = await fs.promises.readFile(this.path, "utf-8");
                users = JSON.parse(users);
                users.push(user);
                console.log("Usuario creado.");
                users = JSON.stringify(users, null, 2);
                await fs.promises.writeFile(this.path, users)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async read() {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            if (!users) {
                new Error("Error en la lectura del array");
            } else {
                return users;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            const user = users.find((each) => each.id === id);
            if (!user) {
                throw new Error("NO EXISTE EL USUARIO.");
            }
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            const filtered = users.filter((each) => each.id !== id);
            if (!id) {
                throw new Error("NO EXISTEN USUARIOS CON ESE ID");
            } else {
                await fs.promises.writeFile(filtered);
                console.log("USUARIO " + id + " ELIMINADO");
            }
        } catch (error) {
            console.log(error);
        }
    }


}

async function test() {
    const usuarios = new UserManager();
    await usuarios.create({
        photo: "nico.jpg",
        email: "nico@gmail.com",
        password: "hola1234",
        role: "admin",
    });

    await usuarios.create({
        photo: "facu.jpg",
        email: "facu@gmail.com",
        password: "facu1234",
        role: "user",
    });

    await usuarios.create({
        photo: "leo.jpg",
        email: "leo@gmail.com",
        password: "leo1234",
        role: "user",
    });

    await usuarios.create({
        photo: "rodri.jpg",
        email: "rodri@gmail.com",
        password: "rodri1234",
        role: "user",
    });
    

    console.log(await usuarios.read()); 
    console.log(await usuarios.readOne());
    console.log(await usuarios.destroy());

}

test();
