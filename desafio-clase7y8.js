const express = require("express");
const Container = require("./classContainer.js");



const app = express();
let productsContainer = new Container('./products.txt');
const PORT = 8080;
app.listen(PORT,()=>{console.log('Serever corriendo en puerto ',PORT)});

app.get('/products', async (req,res)=>{
	try {
		const products = await productsContainer.getAll();
		res.send(products);
	} catch (error) {
		res.send(error);
	}
});

app.get('/randomProduct', async (req,res)=>{
	try {
		const products = await productsContainer.getAll();
		const index = Math.floor(Math.random()*products.length);
		res.send(products[index]);
	} catch (error) {
		res.send(error);
	}

});