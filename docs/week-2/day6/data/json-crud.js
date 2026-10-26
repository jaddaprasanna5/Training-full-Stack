const fs = require("node:fs/promises");

/* async function readProducts(){
    try{
        const text = await fs.readFile("products.json","utf8");
        const products = JSON.parse(text);

        console.log(products);
        console.log(products[0].name);
    }
    catch(error){
        console.log("Could not Read Products:",error.message);
    }
}
readProducts(); */

async function saveProducts(){
    const products = [
        { id: 1, name: "Baby Lotion", price: 250 },
    { id: 2, name: "Baby Shampoo", price: 180 },
    { id: 3, name: "Baby Powder", price: 120 }];
    try{
        const json = JSON.stringify(products,null,2);
        await fs.writeFile("products.json", json,"utf8");
        console.log("Products saved");
    }
    catch(error){
        console.log(error.message);
    }
}
saveProducts();


async function addProduct() {
  try {
    const text = await fs.readFile("data/products.json", "utf8");
    const products = JSON.parse(text);

    const newProduct = {
      id: 3,
      name: "Baby Powder",
      price: 120
    };

    products.push(newProduct);

    await fs.writeFile(
      "data/products.json",
      JSON.stringify(products, null, 2)
    );

    console.log("Product added");
  } catch (error) {
    console.log(error.message);
  }
}

addProduct();


async function updateProduct() {
  try {
    const text = await fs.readFile("data/products.json", "utf8");
    const products = JSON.parse(text);

    const product = products.find((item) => item.id === 1);

    if (!product) {
      console.log("Product not found");
      return;
    }

    product.price = 300;

    await fs.writeFile(
      "data/products.json",
      JSON.stringify(products, null, 2)
    );

    console.log("Product updated");
  } catch (error) {
    console.log(error.message);
  }
}

updateProduct();


async function deleteProduct() {
  try {
    const text = await fs.readFile("data/products.json", "utf8");
    const products = JSON.parse(text);

    const updatedProducts = products.filter(
      (item) => item.id !== 2
    );

    await fs.writeFile(
      "data/products.json",
      JSON.stringify(updatedProducts, null, 2)
    );

    console.log("Product deleted");
  } catch (error) {
    console.log(error.message);
  }
}

deleteProduct();