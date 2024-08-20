import SkeletonWrapper from '@/components/SkeletonWrapper/skeleton-wrapper';
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductList from './_components/ProductList';

export default function Home() {
  return (
    <>
      <ProductList />
    </>
  )
}
