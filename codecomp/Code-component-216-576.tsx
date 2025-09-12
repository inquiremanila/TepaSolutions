import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Alert, AlertDescription } from '../src/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';
import { 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Database, 
  ExternalLink,
  Copy,
  Terminal
} from 'lucide-react';
import { checkSupabaseStorageHealth } from '../src/utils/supabase-images';

interface SetupStatus {
  supabaseConfigured: boolean;
  bucketExists: boolean;
  imagesUploaded: boolean;
  componentsReady: boolean;
}

export function SupabaseImageMigration() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus>({
    supabaseConfigured: false,
    bucketExists: false,
    imagesUploaded: false,
    componentsReady: true // These are already created
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const healthCheck = await checkSupabaseStorageHealth();
      
      setSetupStatus({
        supabaseConfigured: healthCheck.configured,
        bucketExists: healthCheck.bucketExists,
        imagesUploaded: false, // Would need to check actual images
        componentsReady: true
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup check failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const envExample = `VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`;

  const migrationSteps = [
    {
      id: 'setup-supabase',
      title: 'Setup Supabase Project',
      description: 'Create project and configure environment variables',
      status: setupStatus.supabaseConfigured,
      action: 'Configure'
    },
    {
      id: 'create-bucket',
      title: 'Create Storage Bucket',
      description: 'Create "tepa-images" bucket in Supabase Storage',
      status: setupStatus.bucketExists,
      action: 'Create Bucket'
    },
    {
      id: 'upload-images',
      title: 'Upload Images',
      description: 'Migrate images from local storage to Supabase',
      status: setupStatus.imagesUploaded,
      action: 'Upload'
    },
    {
      id: 'update-components',
      title: 'Update Components',
      description: 'Replace LocalImage with SupabaseImage components',
      status: setupStatus.componentsReady,
      action: 'Migrate'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Checking setup status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Supabase Image Migration</h1>
        <p className="text-muted-foreground">
          Migrate from local images to Supabase Storage for better performance and CDN delivery
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {migrationSteps.map((step) => (
          <Card key={step.id} className={step.status ? 'border-green-200' : 'border-orange-200'}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{step.title}</CardTitle>
                {step.status ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs mb-2">
                {step.description}
              </CardDescription>
              <Badge variant={step.status ? 'default' : 'secondary'} className="text-xs">
                {step.status ? 'Complete' : step.action}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="migration">Migration</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Supabase Project Setup
              </CardTitle>
              <CardDescription>
                Create and configure your Supabase project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Create Supabase Project</h4>
                <p className="text-sm text-muted-foreground">
                  Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline inline-flex items-center gap-1">
                    supabase.com <ExternalLink className="h-3 w-3" />
                  </a> and create a new project
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2. Get API Credentials</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Settings → API and copy your Project URL and anon key
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3. Create Environment File</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-medium">.env</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(envExample)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
                    {envExample}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Configuration Commands
              </CardTitle>
              <CardDescription>
                Use these commands to set up and configure Supabase Storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Check Setup Status</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">npm run supabase:check</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Generate Configuration</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">npm run supabase:config</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Upload Images</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">npm run upload-to-supabase</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-1">Analyze Current Usage</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">npm run supabase:analyze</code>
                  </div>
                </div>
              </div>

              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertDescription>
                  Run these commands in your terminal to set up Supabase Storage and migrate your images.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="migration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Migration Guide</CardTitle>
              <CardDescription>
                Step-by-step guide to replace LocalImage with SupabaseImage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">1. Update Imports</h4>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-red-600 mb-1">❌ Before:</p>
                      <code className="text-xs">import &#123; LocalImage &#125; from './LocalImage';</code>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">✅ After:</p>
                      <code className="text-xs">import &#123; SupabaseImage &#125; from './SupabaseImage';</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">2. Update Component Usage</h4>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-red-600 mb-1">❌ Before:</p>
                      <pre className="text-xs overflow-x-auto">
{`<LocalImage
  imageId="iphone-17-devices"
  className="w-full h-64"
/>`}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">✅ After:</p>
                      <pre className="text-xs overflow-x-auto">
{`<SupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-64"
  width={800}
  height={256}
/>`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">3. Remove Direct Image Paths</h4>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-red-600 mb-1">❌ Before:</p>
                      <code className="text-xs">src="/images/photo.png"</code>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">✅ After:</p>
                      <code className="text-xs">Use SupabaseImage component instead</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Component Examples</CardTitle>
              <CardDescription>
                Different ways to use the SupabaseImage component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="optimized">Optimized</TabsTrigger>
                  <TabsTrigger value="lazy">Lazy</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
{`import { SupabaseImage } from './SupabaseImage';

<SupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
  priority={true}
/>`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="optimized">
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
{`<SupabaseImage
  imageId="roblox-group-photo"
  width={800}
  height={192}
  optimization={{
    quality: 85,
    format: 'webp'
  }}
/>`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="lazy">
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
{`import { LazySupabaseImage } from './SupabaseImage';

<LazySupabaseImage
  imageId="iphone-17-devices"
  className="w-full h-64 object-cover rounded-lg"
  width={800}
  height={256}
/>`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-center">
        <Button onClick={checkSetupStatus} variant="outline">
          <Database className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
        <Button asChild>
          <a 
            href="https://supabase.com/docs/guides/storage" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Supabase Docs
          </a>
        </Button>
      </div>
    </div>
  );
}