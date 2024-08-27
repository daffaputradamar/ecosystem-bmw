import { db } from "@/server/db";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const _id = parseInt(params.id);
    // return Response.json(data.find((product: any) => product.id === _id))

    const product = await db.query.products.findFirst({
        where: (model, { eq }) => eq(model.id, _id)
    });

    console.log(product);
    
    if (!product) {
        throw new Error(`Product not found`);
    }

    return Response.json(product);
  }