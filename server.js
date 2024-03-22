import express from "express"
import userManager from "./data/fs/UsersManager.fs.js";
import productManager from "./data/fs/ProductsManager.fs.js"


//server
const server = express();

const PORT = 8080;

const serverReady = () => { console.log(`Server ready on port ${PORT}`); };
server.listen(PORT, serverReady);

//middlewares
server.use(express.urlencoded({ extended: true }))

//router
server.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            response: "CODER API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            res: "Not found",
            success: false
        })
    }
})


server.get("/api/users", async(req, res) => {
    try {
        const { role } = req.query;
        const all = await userManager.read(role);
        
        if (all.length > 0) {
            return res.status(200).json({
                response: all,
                role,
                success: true
            });
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        });
    }
});


server.get("/api/users/:uid", async(req, res) =>{
    try {
        const { uid } = req.params
        const one = await userManager.readOne(uid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true,
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query;
        const all = await productManager.read(category);
        
        if (all.length > 0) {
            return res.status(200).json({
                response: all,
                category,
                success: true,
            });
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        });
    }
});


server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true,
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

// server.get("/api/users", async(req, res) =>{
//     try {
//         const { role } = req.query
//         const all = await userManager.read(role)
//         if (all.length !== 0) {
//             return res.status(200).json({
//                 response: all,
//                 role,
//                 success: true
//             })
//         } else {
//             const error = new Error("NOT FOUND")
//             error.statusCode = 404
//             throw error
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(error.statusCode).json({
//             response: error.message,
//             success: false
//         })
//     }
// })