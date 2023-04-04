const express = require("express")
const {ProductManager} = require("../ProductManager")
const app = express()
const port = 8080
const path = "./archives/products.json"
const productManager = new ProductManager(path);

app.get('/products', (req, res) => {
    const limit = req.query.limit || null;
    const products = productManager.getProducts(limit);
    res.json({ products });
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(parseInt(pid));
    if (!product) {
        res.status(404).json({ error: `Product ${pid} not found` });
    } else {
        res.json({ product });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


