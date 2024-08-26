import ProductList from '../../_components/ProductList';
import { getProducts } from '@/server/queries';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className='py-12 px-4 md:px-6 md:container'>
    <h1 className="text-3xl font-bold mb-8">Product Catalogue</h1>
    <ProductList products={products} />
    </div>
  )
}
