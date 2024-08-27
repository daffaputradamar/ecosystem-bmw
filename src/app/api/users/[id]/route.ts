import { db } from "@/server/db";

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const _id = parseInt(params.id);
    // return Response.json(data.find((product: any) => product.id === _id))

    const user = await db.query.users.findFirst({
        where: (model, { eq }) => eq(model.id, _id)
    });

    
    if (!user) {
        throw new Error(`User not found`);
    }

    return Response.json(user);
  }