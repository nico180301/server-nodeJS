# server-nodeJS

En este repositorio se creará un servidor de NodeJS

Para poder ver el repositorio clonar el siguiente link https://github.com/nico180301/server-nodeJS.git
Y usar los comandos por consola
git clone https://github.com/nico180301/server-nodeJS.git

El cual te va traer todo los archivos que muestra en el repositorio.

Entrega de la semana 3:
Para este tercer entregable, se siguieron los ejemplos y consignas indicadas en clase por el profesor.

Dependencias
Este proyecto utiliza las siguientes dependencias:

Express: Framework de Node.js para crear servidores web.
Nodemon: Herramienta de desarrollo que reinicia automáticamente el servidor cuando detecta cambios en los archivos.

Scripts
Se han definido dos scripts en el archivo package.json:

start: Inicia el servidor en modo de producción.
dev: Inicia el servidor en modo de desarrollo con Nodemon, reiniciándolo automáticamente al detectar cambios en los archivos.
Para iniciar el servidor en modo de desarrollo, puedes ejecutar el siguiente comando: npm run dev

Archivos JSON
Se han creado archivos JSON en la carpeta files para almacenar datos relacionados con usuarios y productos.

Uso del servidor
El servidor responde a las siguientes rutas:

Usuarios
Para consultar usuarios por rol, puedes utilizar la siguiente URL:
http://localhost:8080/api/users?role=admin o http://localhost:8080/api/users?role=user

Productos
Para consultar productos por categoría, puedes utilizar la siguiente URL:
http://localhost:8080/api/products?category=nombre_categoria

Reemplaza nombre_categoria por la categoría deseada.