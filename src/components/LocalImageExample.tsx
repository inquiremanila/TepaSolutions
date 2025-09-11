// Example usage of LocalImage component
import { LocalImage } from './LocalImage';

export function LocalImageExample() {
  return (
    <div className="space-y-4">
      {/* Using LocalImage with image ID */}
      <LocalImage
        imageId="iphone-17-devices"
        className="w-full h-64 object-cover rounded-lg"
        priority={true}
      />
      
      {/* Using LocalImage with Roblox image */}
      <LocalImage
        imageId="roblox-group-photo"
        className="w-full h-48 object-cover rounded-lg"
      />
      
      {/* Direct image usage (alternative approach) */}
      <img
        src="/images/iphone-17-devices.png"
        alt="iPhone 17 devices"
        className="w-full h-64 object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  );
}