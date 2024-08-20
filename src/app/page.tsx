import UploadButton from '@/components/UploadButton/upload-button';
import ProductList from './_components/ProductList';

export default function Home() {
  return (
    <>
      <UploadButton className="mt-28 mb-12" />
      <ProductList />
    </>
  )
}
