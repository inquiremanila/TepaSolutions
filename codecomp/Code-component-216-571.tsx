import React, { useState } from 'react';
import { SupabaseImage, LazySupabaseImage, ResponsiveSupabaseImage } from '../src/components/SupabaseImage';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';
import { Alert, AlertDescription } from '../src/components/ui/alert';
import { CheckCircle, AlertCircle, Upload, Database } from 'lucide-react';

export function ImageSystemDemo() {
  const [activeDemo, setActiveDemo] = useState<'basic' | 'optimized' | 'lazy' | 'responsive'>('basic');

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Supabase Image System</h2>
        <p className="text-muted-foreground">
          CDN-powered image delivery with automatic optimization and lazy loading
        </p>
        
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="default" className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            Supabase Storage
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            CDN Optimized
          </Badge>
        </div>
      </div>

      <Alert>
        <Upload className="h-4 w-4" />
        <AlertDescription>
          Images are served from Supabase Storage with global CDN delivery for optimal performance.
        </AlertDescription>
      </Alert>

      <Tabs value={activeDemo} onValueChange={(value) => setActiveDemo(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="optimized">Optimized</TabsTrigger>
          <TabsTrigger value="lazy">Lazy Loading</TabsTrigger>
          <TabsTrigger value="responsive">Responsive</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic SupabaseImage</CardTitle>
              <CardDescription>
                Simple image component with automatic fallback handling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">iPhone 17 Devices</h4>
                  <SupabaseImage
                    imageId="iphone-17-devices"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                    priority={true}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Roblox Workshop</h4>
                  <SupabaseImage
                    imageId="roblox-group-photo"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Example:</h5>
                <pre className="text-sm overflow-x-auto">
{`import { SupabaseImage } from './SupabaseImage';

<SupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-32 object-cover rounded-lg"
  width={400}
  height={128}
  priority={true}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimized" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimized Images</CardTitle>
              <CardDescription>
                Automatic WebP conversion and quality optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">High Quality (95%)</h4>
                  <SupabaseImage
                    imageId="iphone-17-devices"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                    optimization={{
                      quality: 95,
                      format: 'webp'
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compressed (60%)</h4>
                  <SupabaseImage
                    imageId="roblox-group-photo"
                    className="w-full h-32 object-cover rounded-lg"
                    width={400}
                    height={128}
                    optimization={{
                      quality: 60,
                      format: 'webp'
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Example:</h5>
                <pre className="text-sm overflow-x-auto">
{`<SupabaseImage
  imageId="iphone-17-devices"
  width={400}
  height={128}
  optimization={{
    quality: 85,
    format: 'webp'
  }}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lazy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lazy Loading</CardTitle>
              <CardDescription>
                Images load only when they come into view
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Immediate Load (Priority)</h4>
                  <SupabaseImage
                    imageId="iphone-17-devices"
                    className="w-full h-24 object-cover rounded-lg"
                    width={800}
                    height={96}
                    priority={true}
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Lazy Load (IntersectionObserver)</h4>
                  <LazySupabaseImage
                    imageId="roblox-group-photo"
                    className="w-full h-24 object-cover rounded-lg"
                    width={800}
                    height={96}
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Example:</h5>
                <pre className="text-sm overflow-x-auto">
{`import { LazySupabaseImage } from './SupabaseImage';

<LazySupabaseImage
  imageId="roblox-group-photo"
  className="w-full h-24 object-cover rounded-lg"
  width={800}
  height={96}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Images</CardTitle>
              <CardDescription>
                Multiple formats and sizes for different devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Multi-format Responsive Image</h4>
                <ResponsiveSupabaseImage
                  imageId="iphone-17-devices"
                  className="w-full h-32 object-cover rounded-lg"
                  width={800}
                  height={128}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                />
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Code Example:</h5>
                <pre className="text-sm overflow-x-auto">
{`import { ResponsiveSupabaseImage } from './SupabaseImage';

<ResponsiveSupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-32 object-cover rounded-lg"
  width={800}
  height={128}
  sizes="(max-width: 640px) 100vw, 50vw"
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Migration Benefits</CardTitle>
          <CardDescription>
            Advantages of using Supabase Storage over local images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Performance Benefits
              </h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Global CDN delivery</li>
                <li>• Automatic WebP conversion</li>
                <li>• Image compression & optimization</li>
                <li>• Browser caching with ETags</li>
                <li>• Lazy loading support</li>
                <li>• Responsive image delivery</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-600 mb-2 flex items-center gap-1">
                <Database className="w-4 h-4" />
                Developer Experience
              </h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Simple component API</li>
                <li>• Automatic error handling</li>
                <li>• Loading states & fallbacks</li>
                <li>• TypeScript support</li>
                <li>• Development fallback to local</li>
                <li>• Easy image management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Setup</CardTitle>
          <CardDescription>
            Get started with Supabase images in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline">1</Badge>
              <span className="text-sm">Configure: <code className="bg-muted px-2 py-1 rounded">npm run supabase:config</code></span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">2</Badge>
              <span className="text-sm">Upload: <code className="bg-muted px-2 py-1 rounded">npm run upload-to-supabase</code></span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">3</Badge>
              <span className="text-sm">Migrate: <code className="bg-muted px-2 py-1 rounded">npm run supabase:analyze</code></span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">4</Badge>
              <span className="text-sm">Replace LocalImage with SupabaseImage components</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}