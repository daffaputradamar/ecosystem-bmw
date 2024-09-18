import { db } from "@/server/db";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const _id = parseInt(params.id);

    const productImages = await db.query.productImages.findMany({
        where: (model, { eq }) => eq(model.product_id, _id)
    });

    return Response.json(productImages);
  }