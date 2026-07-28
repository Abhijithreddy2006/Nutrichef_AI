import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

// Development plugin to route /api/generate-recipe to the serverless function during 'npm run dev'
function localApiDevPlugin() {
  return {
    name: 'local-api-dev',
    apply: 'serve' as const,
    configureServer(server: any) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/generate-recipe') return next()

        // Load local .env variables into process.env during local dev
        const env = loadEnv(server.config.mode, server.config.root, '')
        Object.assign(process.env, env)

        // Forward request to Vercel serverless handler
        const { default: handler } = await import('./api/generate-recipe')
        return handler(req as any, res as any)
      })
    },
  }
}

// Student Project Vite Config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApiDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
  },
})
