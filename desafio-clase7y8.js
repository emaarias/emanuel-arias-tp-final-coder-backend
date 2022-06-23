const express = require("express");
const Container = require("./classContainer.js");



const app = express();
let productsContainer = new Container('./products.txt');
const PORT = 8080;
app.listen(PORT,()=>{console.log('Serever corriendo en puerto ',PORT)});
