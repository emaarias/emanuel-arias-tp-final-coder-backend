
import express from 'express';
import {productsRouter} from "./routers/productsRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api/productos", productsRouter);

app.listen(PORT,()=>console.log(`Server corriendo en puerto ${PORT}`));
