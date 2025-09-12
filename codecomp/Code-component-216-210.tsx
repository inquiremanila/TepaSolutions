// Component to demonstrate the migration from LocalImage to R2Image
import React, { useState } from 'react';
import { LocalImage } from '../src/components/LocalImage';
import { R2Image, LazyR2Image, ResponsiveR2Image } from '../src/components/R2Image';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';

export function ImageMigrationGuide() {
  const [currentSystem, setCurrentSystem] = useState<'local' | 'r2'>('local');

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image System Migration Guide</h2>
        <p className="text-muted-foreground">
          Migrate from local images to Cloudflare R2 for better performance and CDN delivery
        </p>
        
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant={currentSystem === 'local' ? 'default' : 'outline'}
            onClick={() => setCurrentSystem('local')}
          >
            LocalImage System
          </Button>
          <Button
            variant={currentSystem === 'r2' ? 'default' : 'outline'}
            onClick={() => setCurrentSystem('r2')}
          >
            R2Image System
          </Button>
        </div>
      </div>

      <Tabs value={currentSystem} onValueChange={(value) => setCurrentSystem(value as 'local' | 'r2')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="local">
            <Badge variant="secondary" className="mr-2">Legacy</Badge>
            Local Images
          </TabsTrigger>
          <TabsTrigger value="r2">
            <Badge variant="default" className="mr-2">New</Badge>
            R2 Images
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>LocalImage System (Current)</CardTitle>
              <CardDescription>
                Images served from /public/images/ directory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">iPhone 17 Devices</h4>
                  <LocalImage
                    imageId="iphone-17-devices"
                    className="w-full h-32 object-cover rounded-lg"
                    priority={true}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Roblox Workshop</h4>
                  <LocalImage
                    imageId="roblox-group-photo"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Example:</h5>
                <pre className="text-sm overflow-x-auto">
{`import { LocalImage } from './LocalImage';

<LocalImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover"
  priority={true}
/>`}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-green-600 mb-1">Pros:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Simple setup</li>
                    <li>• No external dependencies</li>
                    <li>• Works offline</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-600 mb-1">Cons:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• No CDN benefits</li>
                    <li>• Larger bundle size</li>
                    <li>• No image optimization</li>
                    <li>• Single server dependency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="r2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>R2Image System (Recommended)</CardTitle>
              <CardDescription>
                Images served from Cloudflare R2 with global CDN
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">iPhone 17 Devices (Optimized)</h4>
                  <R2Image
                    imageId="iphone-17-devices"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                    priority={true}
                    optimization={{
                      quality: 85,
                      format: 'webp'
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Roblox Workshop (Lazy)</h4>
                  <LazyR2Image
                    imageId="roblox-group-photo"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Examples:</h5>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="optimized">Optimized</TabsTrigger>
                    <TabsTrigger value="responsive">Responsive</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic">
                    <pre className="text-sm overflow-x-auto">
{`import { R2Image } from './R2Image';

<R2Image
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover"
  width={800}
  height={256}
  priority={true}
/>`}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="optimized">
                    <pre className="text-sm overflow-x-auto">
{`<R2Image
  imageId="roblox-group-photo"
  className="w-full h-48 object-cover"
  width={800}
  height={192}
  optimization={{
    quality: 85,
    format: 'webp'
  }}
/>`}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="responsive">
                    <pre className="text-sm overflow-x-auto">
{`<ResponsiveR2Image
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover"
  width={800}
  height={256}
  sizes="(max-width: 640px) 100vw, 50vw"
/>`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-green-600 mb-1">Pros:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Global CDN delivery</li>
                    <li>• Automatic optimization</li>
                    <li>• Multiple format support</li>
                    <li>• Aggressive caching</li>
                    <li>• Lazy loading</li>
                    <li>• Responsive images</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-600 mb-1">Setup Required:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• R2 bucket configuration</li>
                    <li>• Cloudflare Worker setup</li>
                    <li>• Image upload process</li>
                    <li>• API token management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration Steps</CardTitle>
              <CardDescription>
                Follow these steps to migrate to the R2 system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">1</Badge>
                  <span className="text-sm">Run setup: <code className="bg-muted px-2 py-1 rounded">npm run upload-to-r2</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm">Deploy worker: <code className="bg-muted px-2 py-1 rounded">npm run deploy:worker</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm">Update config in <code className="bg-muted px-2 py-1 rounded">/utils/r2-images.ts</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm">Analyze usage: <code className="bg-muted px-2 py-1 rounded">npm run r2:analyze</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">5</Badge>
                  <span className="text-sm">Replace LocalImage with R2Image components</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}