import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// Externalised at build time, rewritten to ComfyUI's runtime paths at emit (ETK pattern).
const COMFY_RUNTIME_MODULES: Record<string, string> = {
  '@comfy/app': '../../../scripts/app.js',
  '@comfy/api': '../../../scripts/api.js',
}

// Fold bundled CSS into the JS so ComfyUI only serves one file.
function inlineCssPlugin(): Plugin {
  return {
    name: 'nynxz-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      let css = ''
      const cssFiles: string[] = []
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && asset.type === 'asset') {
          css += String(asset.source)
          cssFiles.push(fileName)
        }
      }
      if (!css) return
      const jsFile = Object.keys(bundle).find(
        (f) => f === 'main.js' || (f.endsWith('.js') && f.startsWith('main')),
      )
      if (!jsFile) return
      const jsAsset = bundle[jsFile]
      if (!jsAsset || jsAsset.type !== 'chunk') return
      const injector =
        `(function(){var s=document.createElement('style');` +
        `s.setAttribute('data-extension','comfyui-nynxz-experimental');` +
        `s.textContent=${JSON.stringify(css)};` +
        `document.head.appendChild(s);})();`
      jsAsset.code = injector + jsAsset.code
      for (const f of cssFiles) delete bundle[f]
    },
  }
}

export default defineConfig({
  plugins: [vue(), inlineCssPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Shared components only, bundled from the sibling ZenKit (v2 monorepo) source. We
      // use @zenkit/ui (pure Vue SFCs, no ZenKit runtime) — NOT @zenkit/client — so this
      // pack has no runtime dependency on ZenKit being installed.
      // NOTE: the subpath alias MUST come first — @zenkit/ui also matches @zenkit/ui/… , so
      // first-match ordering keeps the CSS from resolving into index.ts/comfy-bridge.css.
      '@zenkit/ui/comfy-bridge.css': fileURLToPath(
        new URL('../ZenKit/packages/ui/src/comfy-bridge.css', import.meta.url),
      ),
      '@zenkit/ui': fileURLToPath(new URL('../ZenKit/packages/ui/src/index.ts', import.meta.url)),
    },
  },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    target: 'es2022',
    outDir: 'web',
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: Infinity,
    lib: {
      entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'main.js',
    },
    rollupOptions: {
      external: (id) => id in COMFY_RUNTIME_MODULES,
      output: {
        paths: COMFY_RUNTIME_MODULES,
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: 'main.js',
        inlineDynamicImports: true,
      },
    },
  },
})
