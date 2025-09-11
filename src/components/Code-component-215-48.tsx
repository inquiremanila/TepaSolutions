import { getLocalImage, getLocalImagePath } from '../utils/local-images';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LocalImageProps {
  imageId: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function LocalImage({ 
  imageId, 
  className = '', 
  width, 
  height, 
  priority = false,
  loading = 'lazy',
  sizes,
  onClick,
  style
}: LocalImageProps) {
  const imageData = getLocalImage(imageId);
  const imagePath = getLocalImagePath(imageId);

  if (!imageData) {
    console.warn(`Local image with id "${imageId}" not found`);
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  const imageProps = {
    src: imagePath,
    alt: imageData.alt,
    title: imageData.title,
    className,
    width,
    height,
    loading: priority ? 'eager' as const : loading,
    'data-priority': priority ? 'high' : undefined,
    sizes,
    onClick,
    style
  };

  return <ImageWithFallback {...imageProps} />;
}

// Alternative component for when you want to use direct image paths
interface DirectLocalImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  title?: string;
}

export function DirectLocalImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  sizes,
  onClick,
  style,
  title
}: DirectLocalImageProps) {
  const imageProps = {
    src: src.startsWith('/images/') ? src : `/images/${src}`,
    alt,
    title,
    className,
    width,
    height,
    loading: priority ? 'eager' as const : loading,
    'data-priority': priority ? 'high' : undefined,
    sizes,
    onClick,
    style
  };

  return <ImageWithFallback {...imageProps} />;
}