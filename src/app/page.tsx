"use client"
import SkeletonWrapper from '@/components/SkeletonWrapper/skeleton-wrapper';
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home() {

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/vercel/next.js');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  })

  useEffect(() => {
    if(isLoading) {
      toast.loading("Load Data...", { id: "repo-data-load" }); 
    } else {
      toast.success("Data loaded successfully", { id: "repo-data-load" });
    }
  }, [isLoading])

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div>
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        <strong>👀 {data?.subscribers_count}</strong>{' '}
        <strong>✨ {data?.stargazers_count}</strong>{' '}
        <strong>🍴 {data?.forks_count}</strong>
      </div>
    </SkeletonWrapper>
  )
}
