const crypto = require("crypto");

class UserManager {
    static #users = [];
    create(data) {
        try {
            const user = {
                id: crypto.randomBytes(12).toString("hex"),
                photo: data.photo || "https://corpomixnds.sfo3.digitaloceanspaces.com/user.jpg",
                email: data.email,
                password: data.password,
                role: data.role,
            };
            if (!data.email || !data.password || !data.role) {
                console.log("Usuar no registrado. Ingrese todos los datos para crear un usuario. ");
            } else {
                UserManager.#users.push(user);
                console.log("Usuario creado.");
            }
        } catch (error) {
            console.log(error);
        }
    }
    read() {
        try {
            const users = UserManager.#users;
            if (!users) {
                throw new Error("Error en la lectura del array");
            } else {
                return users;
            }
        } catch (error) {
            console.log(error);
        }
        return UserManager.#users
    }

    readOne(id) {
        try {
            const user = UserManager.#users.find((each)=> each.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            } else {
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id){
        try {
            const filtered = UserManager.#users.filtered((each) => each.id !== id);
            if (!id) {
                throw new Error("No se encontro usurio con ese ID");
            } else {
                UserManager.#users = filtered;
                console.log("Usuario" + id + " eliminado correctamente");
            }
        } catch (error) {
            console.log(error);
        }
    }

}

const usuarios = new UserManager()
usuarios.create({
    photo: "nico.jpg",
    email: "nico@gmail.com",
    password: "hola1234",
    role: "admin",
});

usuarios.create({
    photo: "facu.jpg",
    email: "facu@gmail.com",
    password: "facu1234",
    role: "user",
});

usuarios.create({
    photo: "leo.jpg",
    email: "leo@gmail.com",
    password: "leo1234",
    role: "user",
});

usuarios.create({
    photo: "rodri.jpg",
    email: "rodri@gmail.com",
    password: "rodri1234",
    role: "user",
});

console.log(usuarios.read());
