// deno.d.ts - Add this file to your project root

declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    has(key: string): boolean;
    toObject(): { [key: string]: string };
  }
  
  export const env: Env;
  
  export function serve(handler: (request: Request) => Response | Promise<Response>): void;
}