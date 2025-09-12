import React, { useState, useEffect } from 'react';
import { getR2Image, getR2ImagePath, getOptimizedR2ImagePath } from '../utils/r2-images';

interface R2ImageProps {
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
    format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  };
  responsive?: boolean;
  fallback?: React.ReactNode;
}

export function R2Image({ 
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
}: R2ImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageData = getR2Image(imageId);
  
  // Use optimized path if optimization options are provided
  const imagePath = optimization
    ? getOptimizedR2ImagePath(imageId, {
        width,
        height,
        ...optimization
      })
    : getR2ImagePath(imageId);

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
        src={imagePath}
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

// Enhanced R2Image with built-in lazy loading and intersection observer
export function LazyR2Image(props: R2ImageProps) {
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
        <R2Image {...props} />
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
export function ResponsiveR2Image({
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
}: R2ImageProps & { sizes?: string }) {
  const imageData = getR2Image(imageId);

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
        srcSet={getOptimizedR2ImagePath(imageId, { width, height, format: 'webp' })}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* AVIF source for browsers that support it (most efficient) */}
      <source
        srcSet={getOptimizedR2ImagePath(imageId, { width, height, format: 'avif' })}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={getR2ImagePath(imageId)}
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