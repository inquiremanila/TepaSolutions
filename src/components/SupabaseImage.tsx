import React, { useState, useEffect } from 'react';
import { getSupabaseImage, getSupabaseImageUrl } from '../utils/supabase-images';

interface SupabaseImageProps {
  imageId?: string;
  url?: string; // Direct URL support
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  alt?: string; // Manual alt text when using direct URL
  title?: string; // Manual title when using direct URL
}

export function SupabaseImage({ 
  imageId,
  url,
  className = '', 
  width, 
  height, 
  priority = false,
  loading = 'lazy',
  onClick,
  style,
  fallback,
  alt,
  title
}: SupabaseImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use direct URL if provided, otherwise get from imageId
  const imageUrl = url || (imageId ? getSupabaseImageUrl(imageId) : '');
  const imageData = imageId ? getSupabaseImage(imageId) : null;
  
  // Debug logging
  console.log('SupabaseImage Debug:', { imageId, url, imageUrl, imageData });
  
  // Use provided alt/title or fall back to imageData
  const imageAlt = alt || imageData?.alt || 'Image';
  const imageTitle = title || imageData?.title || '';

  // Reset error state when imageId or url changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [imageId, url]);

  // Show error if no image source provided
  if (!imageUrl) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">No image source provided</span>
      </div>
    );
  }

  // Show fallback if provided and there's an error
  if (imageError && fallback) {
    return <>{fallback}</>;
  }

  // Show error state
  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  const handleError = () => {
    console.warn(`Failed to load image: ${imageUrl}`);
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      <img
        src={imageUrl}
        alt={imageAlt}
        title={imageTitle}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onClick={onClick}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default SupabaseImage;