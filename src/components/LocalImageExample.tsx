// Example usage of SupabaseImage component
import { SupabaseImage, LazySupabaseImage, ResponsiveSupabaseImage } from './SupabaseImage';

export function SupabaseImageExample() {
  return (
    <div className="space-y-4">
      {/* Using SupabaseImage with image ID */}
      <SupabaseImage
        imageId="iphone-17-devices"
        className="w-full h-64 object-cover rounded-lg"
        width={800}
        height={256}
        priority={true}
      />
      
      {/* Using SupabaseImage with Roblox image and optimization */}
      <SupabaseImage
        imageId="roblox-group-photo"
        className="w-full h-48 object-cover rounded-lg"
        width={800}
        height={192}
        optimization={{
          quality: 85,
          format: 'webp'
        }}
      />
      
      {/* Using LazySupabaseImage for performance */}
      <LazySupabaseImage
        imageId="iphone-17-devices"
        className="w-full h-64 object-cover rounded-lg"
        width={800}
        height={256}
      />
      
      {/* Using ResponsiveSupabaseImage with multiple formats */}
      <ResponsiveSupabaseImage
        imageId="roblox-group-photo"
        className="w-full h-48 object-cover rounded-lg"
        width={800}
        height={192}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
      />
    </div>
  );
}