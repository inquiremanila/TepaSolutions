import React, { useState, useEffect } from 'react';
import { getSupabaseImage, getSupabaseImageUrl, getOptimizedSupabaseImageUrl } from '../src/utils/supabase-images';

interface SupabaseImageProps {
  imageId: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  style?: React.CSSProperties;
  optimization?: {
    quality?: number;
    format?: 'webp' | 'png' | 'jpg' | 'auto';
  };
  responsive?: boolean;
  fallback?: React.ReactNode;
}

export function SupabaseImage({ 
  imageId, 
  className = '', 
  width, 
  height, 
  priority = false,
  loading = 'lazy',
  onClick,
  style,
  optimization,
  responsive = true,
  fallback
}: SupabaseImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageData = getSupabaseImage(imageId);
  
  // Use optimized URL if optimization options are provided
  const imageUrl = optimization || width || height
    ? getOptimizedSupabaseImageUrl(imageId, {
        width,
        height,
        quality: optimization?.quality,
      })
    : getSupabaseImageUrl(imageId);

  // Reset error state when imageId changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [imageId]);

  if (!imageData) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  if (imageError && fallback) {
    return <>{fallback}</>;
  }

  if (imageError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Failed to load image</span>
      </div>
    );
  }

  const handleError = () => {
    console.warn(`Failed to load Supabase image: ${imageId}`);
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  // Generate responsive sizes if responsive is enabled
  const sizes = responsive && width 
    ? `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`
    : undefined;

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      <img
        src={imageUrl}
        alt={imageData.alt}
        title={imageData.title}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        data-priority={priority ? 'high' : undefined}
        sizes={sizes}
        onClick={onClick}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        crossOrigin="anonymous"
      />
    </div>
  );
}

// Enhanced SupabaseImage with built-in lazy loading and intersection observer
export function LazySupabaseImage(props: SupabaseImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef || props.priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' } // Start loading 50px before the image comes into view
    );

    observer.observe(elementRef);

    return () => observer.disconnect();
  }, [elementRef, props.priority]);

  return (
    <div ref={setElementRef} className={props.className}>
      {(isInView || props.priority) ? (
        <SupabaseImage {...props} />
      ) : (
        <div 
          className="bg-muted animate-pulse rounded"
          style={{ width: props.width, height: props.height }}
        />
      )}
    </div>
  );
}

// Picture element with multiple sources for better optimization
export function ResponsiveSupabaseImage({
  imageId,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  onClick,
  style,
  sizes,
  ...props
}: SupabaseImageProps & { sizes?: string }) {
  const imageData = getSupabaseImage(imageId);

  if (!imageData) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <picture className={className} onClick={onClick} style={style}>
      {/* WebP source for browsers that support it */}
      <source
        srcSet={getSupabaseImageUrl(imageId, { width, height, format: 'webp' })}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={getSupabaseImageUrl(imageId)}
        alt={imageData.alt}
        title={imageData.title}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        data-priority={priority ? 'high' : undefined}
        sizes={sizes}
      />
    </picture>
  );
}

// Hook for managing Supabase image loading state
export function useSupabaseImage(imageId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const imageData = getSupabaseImage(imageId);
    if (!imageData) {
      setError('Image not found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const imageUrl = getSupabaseImageUrl(imageId);
    setUrl(imageUrl);

    // Preload the image to check if it exists
    const img = new Image();
    img.onload = () => {
      setLoading(false);
    };
    img.onerror = () => {
      setError('Failed to load image');
      setLoading(false);
    };
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageId]);

  return { loading, error, url, imageData: getSupabaseImage(imageId) };
}