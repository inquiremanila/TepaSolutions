import { getLocalImage, getLocalImagePath } from '../utils/local-images';

interface LocalImageProps {
  imageId: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
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
  onClick,
  style
}: LocalImageProps) {
  const imageData = getLocalImage(imageId);
  const imagePath = getLocalImagePath(imageId);

  if (!imageData) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <img
      src={imagePath}
      alt={imageData.alt}
      title={imageData.title}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      data-priority={priority ? 'high' : undefined}
      onClick={onClick}
      style={style}
    />
  );
}