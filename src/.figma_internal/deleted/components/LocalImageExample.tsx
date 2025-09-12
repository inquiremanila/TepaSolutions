// Example usage of R2Image component
import { R2Image, LazyR2Image, ResponsiveR2Image } from './R2Image';

export function R2ImageExample() {
  return (
    <div className="space-y-4">
      {/* Using R2Image with image ID */}
      <R2Image
        imageId="iphone-17-devices"
        className="w-full h-64 object-cover rounded-lg"
        priority={true}
        width={800}
        height={256}
      />
      
      {/* Using R2Image with Roblox image and optimization */}
      <R2Image
        imageId="roblox-group-photo"
        className="w-full h-48 object-cover rounded-lg"
        width={800}
        height={192}
        optimization={{
          quality: 85,
          format: 'webp'
        }}
      />
      
      {/* Using LazyR2Image for performance */}
      <LazyR2Image
        imageId="iphone-17-devices"
        className="w-full h-64 object-cover rounded-lg"
        width={800}
        height={256}
      />
      
      {/* Using ResponsiveR2Image with multiple formats */}
      <ResponsiveR2Image
        imageId="roblox-group-photo"
        className="w-full h-48 object-cover rounded-lg"
        width={800}
        height={192}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
      />
    </div>
  );
}