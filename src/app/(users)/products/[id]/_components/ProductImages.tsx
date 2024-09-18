'use client'
import { ProductSchemaType } from "@/schema/product";
import { ProductImageSchemaType } from "@/schema/product_images";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({product, productImages}: {product: ProductSchemaType, productImages: ProductImageSchemaType[]}) {

    const [selectedImage, setSelectedImage] = useState(product.image_url);

    return (
        <div className="grid gap-4 md:gap-6">
            {/* Main Image */}
            <Image
                src={selectedImage}
                alt="Product Image"
                width={600}
                height={600}
                className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
            />

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
                {/* Main product image thumbnail */}
                <div className="cursor-pointer">
                    <Image
                        src={product.image_url}
                        alt="Main Image Thumbnail"
                        width={100}
                        height={100}
                        className={`aspect-square object-cover border rounded-lg overflow-hidden ${selectedImage === product.image_url ? 'border-primary' : ''}`}
                        onClick={() => setSelectedImage(product.image_url)}
                    />
                </div>

                {/* Additional product images thumbnails */}
                {productImages.map((image) => (
                    <div key={image.id} className="cursor-pointer">
                        <Image
                            src={image.image_url}
                            alt={`Product Image ${image.id}`}
                            width={100}
                            height={100}
                            className={`aspect-square object-cover border rounded-lg overflow-hidden ${selectedImage === image.image_url ? 'border-primary' : ''}`}
                            onClick={() => setSelectedImage(image.image_url)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}


const MagnifyingGlassImage = ({ src, alt }: { src: string, alt: string }) => {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const magnifierSize = 150; // Size of the magnifying glass
    const zoomLevel = 2; // Zoom level
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
  
      setMagnifierPosition({
        x: Math.max(0, Math.min(x, width)),
        y: Math.max(0, Math.min(y, height)),
      });
    };
  
    return (
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        {/* Main Product Image */}
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className="aspect-square object-cover w-full rounded-lg"
        />
  
        {/* Magnifying Glass Effect */}
        {showMagnifier && (
          <div
            style={{
              position: 'absolute',
              top: magnifierPosition.y - magnifierSize / 2,
              left: magnifierPosition.x - magnifierSize / 2,
              width: `${magnifierSize}px`,
              height: `${magnifierSize}px`,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backgroundImage: `url(${src})`,
              backgroundSize: `${800 * zoomLevel}px ${800 * zoomLevel}px`, // Adjust to image size and zoom level
              backgroundPosition: `-${magnifierPosition.x * zoomLevel - magnifierSize / 2}px -${
                magnifierPosition.y * zoomLevel - magnifierSize / 2
              }px`,
              border: '2px solid #000',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              cursor: 'none', // Hide the default cursor
            }}
          />
        )}
      </div>
    );
  };