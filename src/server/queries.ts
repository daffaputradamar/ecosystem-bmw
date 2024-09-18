import "server-only";
import { db } from "./db";

export async function getProducts() {

    const products = await db.query.products.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });

    return products;
}

export async function getProductById(id: number) {
    const product = await db.query.products.findFirst({
        where: (model, { eq }) => eq(model.id, id),
        orderBy: (model, { desc }) => desc(model.id)
    });

    if (!product) {
        throw new Error(`Product not found`);
    }

    return product;
}

export async function getProductImagesByProductId(productId: number) {
    const images = await db.query.productImages.findMany({
      where: (productImage, { eq }) => eq(productImage.product_id, productId),
    });
  
    return images;
  }

export async function getUsers() {

    const users = await db.query.users.findMany({
        where: (model, { ne }) => ne(model.username, "admin"),
        orderBy: (model, { desc }) => desc(model.id),
    });

    return users;
}