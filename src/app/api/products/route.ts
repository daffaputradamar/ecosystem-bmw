export async function GET() {
  const data = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      image: 'https://picsum.photos/id/100/200/300',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      image: 'https://picsum.photos/id/200/200/300',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Product 3 description',
      price: 300,
      image: 'https://picsum.photos/id/300/200/300',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Product 4 description',
      price: 400,
      image: 'https://picsum.photos/id/400/200/300',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Product 5 description',
      price: 500,
      image: 'https://picsum.photos/id/500/200/300',
    },
    {
        id: 6,
        name: 'Product 6',
        description: 'Product 6 description',
        price: 600,
        image: 'https://picsum.photos/id/600/200/300',
      },
  ]
 
  return Response.json(data)
}