import ProductList from '../../_components/ProductList';
import { getProducts } from '@/server/queries';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const products = await getProducts();
  
  return (
    <>
      {/* <UploadButton className="mt-28 mb-12" /> */}
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
      /> */}
      <ProductList products={products} />
    </>
  )
}
