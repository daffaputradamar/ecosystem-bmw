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
        orderBy: (model, { desc }) => desc(model.id),
    });

    if (!product) {
        throw new Error(`Product not found`);
    }

    return product;
}

export async function getUsers() {

    const users = await db.query.users.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });

    return users;
}