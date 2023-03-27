const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        // Validate that all fields are required
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("All fields are required");
            return;
        }
        // Validate that the "code" field is not repeated
        if (products.some((p) => p.code === product.code)) {
            console.error("Code already exists");
            return;
        }

    const newProduct = {
        ...product,
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        };

        products.push(newProduct);
        this.saveProducts(products);
        console.log(`Product ${newProduct.id} added`);
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            return JSON.parse(data);
            } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((p) => p.id === id);

        if (!product) {
            console.error(`Product ${id} not found`);
            return;
        }

        return product;
    }

    updateProduct(id, newProduct) {
        const products = this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex < 0) {
            console.error(`Product ${id} not found`);
            return;
        }

        const updatedProduct = {
            ...products[productIndex],
            ...newProduct,
            id,
        };

        products[productIndex] = updatedProduct;
        this.saveProducts(products);
        console.log(`Product ${id} updated`);
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);

        if (productIndex < 0) {
            console.error(`Product ${id} not found`);
            return;
        }

        products.splice(productIndex, 1);
        this.saveProducts(products);
        console.log(`Product ${id} deleted`);
    }

    saveProducts(products) {
        const data = JSON.stringify(products);
        fs.writeFileSync(this.path, data);
    }
}



// Testing
/* 
const path = "./products.json";
const productManager = new ProductManager(path);

// Adding a product
productManager.addProduct({
    title: "producto prueba",
    description: "Esto es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
});

// Adding another product
productManager.addProduct({
    title: "producto prueba 2",
    description: "Esto es un producto prueba 2",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock: 30,
});

// Get all products
const products = productManager.getProducts();
console.log(products);

// Get a product by id
const productId = 1;
const productById = productManager.getProductById(productId);
console.log("This is the product that you are looking for")
console.log(productById);

// Update Product
const productIdToUpdate = 1;
productManager.updateProduct(productIdToUpdate, {
    title: "Producto 1 actualizado",
    price: 15.5,
});
const updatedProduct = productManager.getProductById(productIdToUpdate);
console.log(updatedProduct);

// Delete a product
const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);
const productsAfterDelete = productManager.getProducts();
console.log("This are the products that you have now")
console.log(productsAfterDelete); 
*/