import { Router } from "express";
import { ContainerMemory } from "../Api/Container.js";

const productsRouter = Router();
const ProductsApi = new ContainerMemory();

productsRouter.get("/", (req, res) => {
	const products = ProductsApi.getAll();
	res.json(products);
});

productsRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const product = ProductsApi.getById(id);
	res.json(product);
});

productsRouter.post("/", (req, res) => {
	const { title, price, thumbnail } = req.body;
	const newProduct = { title, price, thumbnail };
	const product = ProductsApi.save(newProduct)
	res.json(product);
});

productsRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const { title, price, thumbnail } = req.body;
	const productUpdate = ProductsApi.updateById(id , { title, price, thumbnail })
	if (productUpdate.err) res.json({error : 'No se encontró el producto.'})
	res.json(productUpdate);
});

productsRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const deleteProduct = ProductsApi.deleteById(id);
	if(deleteProduct.error) res.json({error : 'No se encontró el producto.'})
	res.json({success : 'El producto fué eliminado correctamente.'});
});

export { productsRouter };
