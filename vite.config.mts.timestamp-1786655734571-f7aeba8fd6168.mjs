// vite.config.mts
import fs from "fs";
import path2 from "path";
import { defineConfig } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vitest@1.6.1_@types+node@20.19.23_jsdom@23.2.0_terser@5.46.1/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.21_@types+node@20.19.23_terser@5.46.1_/node_modules/@vitejs/plugin-react/dist/index.js";
import loadVersion from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vite-plugin-package-version@1.1.0_vite@5.4.21_@types+node@20.19.23_terser@5.46.1_/node_modules/vite-plugin-package-version/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vite-plugin-pwa@0.17.5_vite@5.4.21_@types+node@20.19.23_terser@5.46.1__workbox-build@7.3.0_@t_rqzdegdij6cv7wxu54qbovayru/node_modules/vite-plugin-pwa/dist/index.js";
import checker from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.1_optionator@0.9.4_typescript@5.9.3_vite@5.4.21_@types+_rlpb6akiy25driqzoohpzulic4/node_modules/vite-plugin-checker/dist/esm/main.js";

// plugins/handlebars.ts
import { globSync } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/glob@10.4.5/node_modules/glob/dist/esm/index.js";
import { viteStaticCopy } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vite-plugin-static-copy@3.1.4_vite@5.4.21_@types+node@20.19.23_terser@5.46.1_/node_modules/vite-plugin-static-copy/dist/index.js";
import Handlebars from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/handlebars@4.7.8/node_modules/handlebars/lib/index.js";
import path from "path";
var handlebars = (options = {}) => {
  const files = globSync("src/assets/**/**.hbs");
  function render(content) {
    const template = Handlebars.compile(content);
    return template(options?.vars ?? {});
  }
  return [
    {
      name: "hbs-templating",
      enforce: "pre",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return render(html);
        }
      }
    },
    viteStaticCopy({
      silent: true,
      targets: files.map((file) => ({
        src: file,
        dest: "",
        rename: path.basename(file).slice(0, -4),
        // remove .hbs file extension
        transform: {
          encoding: "utf8",
          handler(content) {
            return render(content);
          }
        }
      }))
    })
  ];
};

// vite.config.mts
import { loadEnv, splitVendorChunkPlugin } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.23_terser@5.46.1/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.43.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import tailwind from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/tailwindcss@3.4.18_yaml@2.8.0/node_modules/tailwindcss/lib/index.js";
import rtl from "file:///C:/Users/mohib/Desktop/HH/kal-Stream/node_modules/.pnpm/postcss-rtlcss@4.0.9_postcss@8.5.6/node_modules/postcss-rtlcss/esm/index.js";
var __vite_injected_original_dirname = "C:\\Users\\mohib\\Desktop\\HH\\kal-Stream";
var BUILD_ID = process.env.GITHUB_SHA || String(Date.now());
function emitVersionJSON() {
  return {
    name: "emit-version-json",
    apply: "build",
    writeBundle(options) {
      const dir = options.dir || "dist";
      fs.writeFileSync(
        path2.join(dir, "version.json"),
        JSON.stringify({ version: BUILD_ID })
      );
    }
  };
}
var captioningPackages = [
  "dompurify",
  "htmlparser2",
  "subsrt-ts",
  "parse5",
  "entities",
  "fuse"
];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL || "/",
    define: {
      __BUILD_ID__: JSON.stringify(BUILD_ID)
    },
    plugins: [
      emitVersionJSON(),
      handlebars({
        vars: {
          opensearchEnabled: env.VITE_OPENSEARCH_ENABLED === "true",
          routeDomain: env.VITE_APP_DOMAIN + (env.VITE_NORMAL_ROUTER !== "true" ? "/#" : ""),
          domain: env.VITE_APP_DOMAIN,
          env
        }
      }),
      react({
        babel: {
          presets: [
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: "entry",
                corejs: {
                  version: "3.34"
                }
              }
            ]
          ]
        }
      }),
      VitePWA({
        disable: env.VITE_PWA_ENABLED !== "true",
        registerType: "autoUpdate",
        workbox: {
          maximumFileSizeToCacheInBytes: 4e6,
          // 4mb
          globIgnores: ["!assets/**/*"]
        },
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "safari-pinned-tab.svg"
        ],
        manifest: {
          name: "kal-Stream",
          short_name: "kal-Stream",
          description: "Watch your favorite shows and movies for free! (\u3063'\u30EE'c)",
          theme_color: "#000000",
          background_color: "#000000",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      }),
      loadVersion(),
      checker({
        overlay: {
          position: "tr"
        },
        typescript: true,
        // check typescript build errors in dev server
        eslint: {
          // check lint errors in dev server
          lintCommand: "eslint --ext .tsx,.ts --max-warnings 999 src",
          dev: {
            logLevel: ["error"]
          }
        }
      }),
      splitVendorChunkPlugin(),
      visualizer()
    ],
    build: {
      chunkSizeWarningLimit: 2e3,
      sourcemap: mode !== "production",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("@sozialhelden+ietf-language-tags") || id.includes("country-language")) {
              return "language-db";
            }
            if (id.includes("hls.js")) {
              return "hls";
            }
            if (id.includes("node-forge") || id.includes("crypto-js")) {
              return "auth";
            }
            if (id.includes("locales") && !id.includes("en.json")) {
              return "locales";
            }
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            if (id.includes("Icon.tsx")) {
              return "Icons";
            }
            const isCaptioningPackage = captioningPackages.some(
              (packageName) => id.includes(packageName)
            );
            if (isCaptioningPackage) {
              return "caption-parsing";
            }
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), rtl()]
      }
    },
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "./src"),
        "@themes": path2.resolve(__vite_injected_original_dirname, "./themes"),
        "@sozialhelden/ietf-language-tags": path2.resolve(
          __vite_injected_original_dirname,
          "./node_modules/@sozialhelden/ietf-language-tags/dist/cjs"
        )
      }
    },
    test: {
      environment: "jsdom"
    },
    preview: {
      host: true,
      port: 80,
      allowedHosts: ["pstream.net", "pstream-test.vercel.app"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBsdWdpbnMvaGFuZGxlYmFycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1vaGliXFxcXERlc2t0b3BcXFxcSEhcXFxccC1zdHJlYW1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1vaGliXFxcXERlc2t0b3BcXFxcSEhcXFxccC1zdHJlYW1cXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tb2hpYi9EZXNrdG9wL0hIL3Atc3RyZWFtL3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgbG9hZFZlcnNpb24gZnJvbSBcInZpdGUtcGx1Z2luLXBhY2thZ2UtdmVyc2lvblwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBjaGVja2VyIGZyb20gXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI7XG5pbXBvcnQgeyBoYW5kbGViYXJzIH0gZnJvbSBcIi4vcGx1Z2lucy9oYW5kbGViYXJzXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGxvYWRFbnYsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHJ0bCBmcm9tIFwicG9zdGNzcy1ydGxjc3NcIjtcblxuLy8gQnVpbGQgaWQgZm9yIHRoZSBcIm5ldyB2ZXJzaW9uIGF2YWlsYWJsZVwiIHVwZGF0ZS1ub3RpY2U6IHRoZSBkZXBsb3lpbmdcbi8vIEdpdEh1YiBBY3Rpb25zIHJ1bidzIGNvbW1pdCBzaGEsIHNvIGl0IGNoYW5nZXMgb24gZXZlcnkgcmVhbCBkZXBsb3kuXG4vLyBwYWNrYWdlLmpzb24ncyB2ZXJzaW9uIGZpZWxkIGRvZXNuJ3QgZ2V0IGJ1bXBlZCBwZXItZGVwbG95LCBzbyBpdCBjYW4ndCBiZVxuLy8gdXNlZCBmb3IgdGhpcy4gRmFsbHMgYmFjayB0byBhIHRpbWVzdGFtcCBmb3IgbG9jYWwvcHJldmlldyBidWlsZHMuXG5jb25zdCBCVUlMRF9JRCA9IHByb2Nlc3MuZW52LkdJVEhVQl9TSEEgfHwgU3RyaW5nKERhdGUubm93KCkpO1xuXG4vLyBFbWl0cyBkaXN0L3ZlcnNpb24uanNvbiB3aXRoIHRoZSBzYW1lIGlkIHRoZSBjbGllbnQgaXMgYnVpbHQgYWdhaW5zdCwgc29cbi8vIGEgcnVubmluZyB0YWIgY2FuIHBvbGwgaXQgYW5kIGRldGVjdCB3aGVuIGEgbmV3ZXIgYnVpbGQgaGFzIGJlZW4gZGVwbG95ZWQuXG5mdW5jdGlvbiBlbWl0VmVyc2lvbkpTT04oKTogUGx1Z2luT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImVtaXQtdmVyc2lvbi1qc29uXCIsXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICB3cml0ZUJ1bmRsZShvcHRpb25zKSB7XG4gICAgICBjb25zdCBkaXIgPSBvcHRpb25zLmRpciB8fCBcImRpc3RcIjtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIHBhdGguam9pbihkaXIsIFwidmVyc2lvbi5qc29uXCIpLFxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHZlcnNpb246IEJVSUxEX0lEIH0pLFxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBjYXB0aW9uaW5nUGFja2FnZXMgPSBbXG4gIFwiZG9tcHVyaWZ5XCIsXG4gIFwiaHRtbHBhcnNlcjJcIixcbiAgXCJzdWJzcnQtdHNcIixcbiAgXCJwYXJzZTVcIixcbiAgXCJlbnRpdGllc1wiLFxuICBcImZ1c2VcIixcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1VSTCB8fCBcIi9cIixcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQlVJTERfSURfXzogSlNPTi5zdHJpbmdpZnkoQlVJTERfSUQpLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgZW1pdFZlcnNpb25KU09OKCksXG4gICAgICBoYW5kbGViYXJzKHtcbiAgICAgICAgdmFyczoge1xuICAgICAgICAgIG9wZW5zZWFyY2hFbmFibGVkOiBlbnYuVklURV9PUEVOU0VBUkNIX0VOQUJMRUQgPT09IFwidHJ1ZVwiLFxuICAgICAgICAgIHJvdXRlRG9tYWluOlxuICAgICAgICAgICAgZW52LlZJVEVfQVBQX0RPTUFJTiArXG4gICAgICAgICAgICAoZW52LlZJVEVfTk9STUFMX1JPVVRFUiAhPT0gXCJ0cnVlXCIgPyBcIi8jXCIgOiBcIlwiKSxcbiAgICAgICAgICBkb21haW46IGVudi5WSVRFX0FQUF9ET01BSU4sXG4gICAgICAgICAgZW52LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICByZWFjdCh7XG4gICAgICAgIGJhYmVsOiB7XG4gICAgICAgICAgcHJlc2V0czogW1xuICAgICAgICAgICAgXCJAYmFiZWwvcHJlc2V0LXR5cGVzY3JpcHRcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kdWxlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXNlQnVpbHRJbnM6IFwiZW50cnlcIixcbiAgICAgICAgICAgICAgICBjb3JlanM6IHtcbiAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMy4zNFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIFZpdGVQV0Eoe1xuICAgICAgICBkaXNhYmxlOiBlbnYuVklURV9QV0FfRU5BQkxFRCAhPT0gXCJ0cnVlXCIsXG4gICAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNDAwMDAwMCwgLy8gNG1iXG4gICAgICAgICAgZ2xvYklnbm9yZXM6IFtcIiFhc3NldHMvKiovKlwiXSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgICAgIFwiZmF2aWNvbi5pY29cIixcbiAgICAgICAgICBcImFwcGxlLXRvdWNoLWljb24ucG5nXCIsXG4gICAgICAgICAgXCJzYWZhcmktcGlubmVkLXRhYi5zdmdcIixcbiAgICAgICAgXSxcbiAgICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgICBuYW1lOiBcIlotU3RyZWFtXCIsXG4gICAgICAgICAgc2hvcnRfbmFtZTogXCJaLVN0cmVhbVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICAgXCJXYXRjaCB5b3VyIGZhdm9yaXRlIHNob3dzIGFuZCBtb3ZpZXMgZm9yIGZyZWUhIChcdTMwNjMnXHUzMEVFJ2MpXCIsXG4gICAgICAgICAgdGhlbWVfY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXG4gICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiBcImFuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJhbnlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IFwiYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IFwiYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGxvYWRWZXJzaW9uKCksXG4gICAgICBjaGVja2VyKHtcbiAgICAgICAgb3ZlcmxheToge1xuICAgICAgICAgIHBvc2l0aW9uOiBcInRyXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsIC8vIGNoZWNrIHR5cGVzY3JpcHQgYnVpbGQgZXJyb3JzIGluIGRldiBzZXJ2ZXJcbiAgICAgICAgZXNsaW50OiB7XG4gICAgICAgICAgLy8gY2hlY2sgbGludCBlcnJvcnMgaW4gZGV2IHNlcnZlclxuICAgICAgICAgIGxpbnRDb21tYW5kOiBcImVzbGludCAtLWV4dCAudHN4LC50cyAtLW1heC13YXJuaW5ncyA5OTkgc3JjXCIsXG4gICAgICAgICAgZGV2OiB7XG4gICAgICAgICAgICBsb2dMZXZlbDogW1wiZXJyb3JcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLFxuICAgICAgdmlzdWFsaXplcigpIGFzIFBsdWdpbk9wdGlvbixcbiAgICBdLFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcbiAgICAgIHNvdXJjZW1hcDogbW9kZSAhPT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rcyhpZDogc3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwiQHNvemlhbGhlbGRlbitpZXRmLWxhbmd1YWdlLXRhZ3NcIikgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoXCJjb3VudHJ5LWxhbmd1YWdlXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwibGFuZ3VhZ2UtZGJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImhscy5qc1wiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJobHNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGUtZm9yZ2VcIikgfHwgaWQuaW5jbHVkZXMoXCJjcnlwdG8tanNcIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiYXV0aFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibG9jYWxlc1wiKSAmJiAhaWQuaW5jbHVkZXMoXCJlbi5qc29uXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcImxvY2FsZXNcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWRvbVwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJyZWFjdC1kb21cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkljb24udHN4XCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIkljb25zXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpc0NhcHRpb25pbmdQYWNrYWdlID0gY2FwdGlvbmluZ1BhY2thZ2VzLnNvbWUoKHBhY2thZ2VOYW1lKSA9PlxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcyhwYWNrYWdlTmFtZSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGlzQ2FwdGlvbmluZ1BhY2thZ2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiY2FwdGlvbi1wYXJzaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIHJ0bCgpXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICBcIkB0aGVtZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3RoZW1lc1wiKSxcbiAgICAgICAgXCJAc296aWFsaGVsZGVuL2lldGYtbGFuZ3VhZ2UtdGFnc1wiOiBwYXRoLnJlc29sdmUoXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgIFwiLi9ub2RlX21vZHVsZXMvQHNvemlhbGhlbGRlbi9pZXRmLWxhbmd1YWdlLXRhZ3MvZGlzdC9janNcIixcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHRlc3Q6IHtcbiAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcG9ydDogODAsXG4gICAgICBhbGxvd2VkSG9zdHM6IFtcInBzdHJlYW0ubmV0XCIsIFwicHN0cmVhbS10ZXN0LnZlcmNlbC5hcHBcIl0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb2hpYlxcXFxEZXNrdG9wXFxcXEhIXFxcXHAtc3RyZWFtXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1vaGliXFxcXERlc2t0b3BcXFxcSEhcXFxccC1zdHJlYW1cXFxccGx1Z2luc1xcXFxoYW5kbGViYXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9tb2hpYi9EZXNrdG9wL0hIL3Atc3RyZWFtL3BsdWdpbnMvaGFuZGxlYmFycy50c1wiO2ltcG9ydCB7IGdsb2JTeW5jIH0gZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSBcInZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5XCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSBcImhhbmRsZWJhcnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGViYXJzID0gKFxuICBvcHRpb25zOiB7IHZhcnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0gPSB7fSxcbik6IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgZmlsZXMgPSBnbG9iU3luYyhcInNyYy9hc3NldHMvKiovKiouaGJzXCIpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgIHJldHVybiB0ZW1wbGF0ZShvcHRpb25zPy52YXJzID8/IHt9KTtcbiAgfVxuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbmFtZTogXCJoYnMtdGVtcGxhdGluZ1wiLFxuICAgICAgZW5mb3JjZTogXCJwcmVcIixcbiAgICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgICBvcmRlcjogXCJwcmVcIixcbiAgICAgICAgaGFuZGxlcihodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbmRlcihodG1sKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICB0YXJnZXRzOiBmaWxlcy5tYXAoKGZpbGUpID0+ICh7XG4gICAgICAgIHNyYzogZmlsZSxcbiAgICAgICAgZGVzdDogXCJcIixcbiAgICAgICAgcmVuYW1lOiBwYXRoLmJhc2VuYW1lKGZpbGUpLnNsaWNlKDAsIC00KSwgLy8gcmVtb3ZlIC5oYnMgZmlsZSBleHRlbnNpb25cbiAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgZW5jb2Rpbmc6IFwidXRmOFwiLFxuICAgICAgICAgIGhhbmRsZXIoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyKGNvbnRlbnQpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSksXG4gICAgfSksXG4gIF07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxPQUFPLFFBQVE7QUFDclQsT0FBT0EsV0FBVTtBQUVqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTs7O0FDUHdTLFNBQVMsZ0JBQWdCO0FBQ3JWLFNBQVMsc0JBQXNCO0FBRS9CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sVUFBVTtBQUVWLElBQU0sYUFBYSxDQUN4QixVQUEwQyxDQUFDLE1BQ3hCO0FBQ25CLFFBQU0sUUFBUSxTQUFTLHNCQUFzQjtBQUU3QyxXQUFTLE9BQU8sU0FBeUI7QUFDdkMsVUFBTSxXQUFXLFdBQVcsUUFBUSxPQUFPO0FBQzNDLFdBQU8sU0FBUyxTQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQUEsRUFDckM7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1Qsb0JBQW9CO0FBQUEsUUFDbEIsT0FBTztBQUFBLFFBQ1AsUUFBUSxNQUFNO0FBQ1osaUJBQU8sT0FBTyxJQUFJO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsU0FBUyxNQUFNLElBQUksQ0FBQyxVQUFVO0FBQUEsUUFDNUIsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sUUFBUSxLQUFLLFNBQVMsSUFBSSxFQUFFLE1BQU0sR0FBRyxFQUFFO0FBQUE7QUFBQSxRQUN2QyxXQUFXO0FBQUEsVUFDVCxVQUFVO0FBQUEsVUFDVixRQUFRLFNBQWlCO0FBQ3ZCLG1CQUFPLE9BQU8sT0FBTztBQUFBLFVB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
