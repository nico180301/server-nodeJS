class UserManager {
  static #users = [];
  create(data) {
    const user = {
        id:
        UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: 0,
    };
        UserManager.#users.push(user);
        console.log("Usuario creado");
    }
 read(){
    return UserManager.#users
 }
}

const usuarios = new UserManager()
usuarios.create({
    photo: "nico.jpg",
    email: "nico@gmail.com",
    password: "hola1234",
})
// crear un nuevo usuario
usuarios.create({
    photo: "facu.jpg",
    email: "facu@gmail.com",
    password: "4321hola",
})

console.log(usuarios.read());
