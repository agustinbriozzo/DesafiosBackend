class ProductManager {
    constructor() {
        this.products = [];
        this.lastId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Validate that all fields are required
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: All the fields are required.");
        }

    // Validate that the "code" field is not repeated
    const existingProduct = this.products.find((product) => product.code === code);
    if (existingProduct) {
        console.log(`Error: There is already a product with the code ${code}.`);
    }

    // Add product to the array
    const newProduct = {
        id: ++this.lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };
    this.products.push(newProduct);
    console.log(`The product was successfully added: ${JSON.stringify(newProduct)}`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
        console.log(`Error: No product was found with the id ${id}.`);
    }
    return product;
    }
}


// Code testing

/* const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Esto es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba", "Esto es un producto prueba", 200, "Sin imagen", "abc123", 25);


const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(1);
console.log(productById); */







