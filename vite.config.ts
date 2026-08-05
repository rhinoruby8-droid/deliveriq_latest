import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { URL } from "node:url";

function extractHostname(value: string): string {
	try {
		if (value.includes("://")) {
			return new URL(value).hostname;
		}
		return value;
	} catch {
		return value;
	}
}

function apiDevPlugin(): Plugin {
	return {
		name: "api-dev",
		apply: "serve",
		configureServer(server: ViteDevServer) {
			server.middlewares.use(async (req, res, next) => {
				if (!req.url?.startsWith("/api")) return next();
				try {
					const mod = await server.ssrLoadModule("/src/server/entry.ts");
					const handler = mod.default;
					handler(req, res, next);
				} catch (err) {
					if (err instanceof Error) server.ssrFixStacktrace(err);
					next(err);
				}
			});
		},
	};
}

const allowedHosts: string[] = [];
const corsOrigins: string[] = [];

if (process.env.FRONTEND_DOMAIN) {
	const frontendHost = extractHostname(process.env.FRONTEND_DOMAIN);
	allowedHosts.push(frontendHost);
	corsOrigins.push(`http://${frontendHost}`, `https://${frontendHost}`);
}
if (process.env.ALLOWED_ORIGINS) {
	const origins = process.env.ALLOWED_ORIGINS.split(",");
	allowedHosts.push(...origins.map(extractHostname));
	corsOrigins.push(...origins);
}
if (process.env.VITE_PARENT_ORIGIN) {
	allowedHosts.push(extractHostname(process.env.VITE_PARENT_ORIGIN));
	corsOrigins.push(process.env.VITE_PARENT_ORIGIN);
}
if (allowedHosts.length === 0) {
	allowedHosts.push("*");
}
if (corsOrigins.length === 0) {
	corsOrigins.push("*");
}

export default defineConfig(({ isSsrBuild }) => ({
	envPrefix: ["VITE_", "SITE_"],

	plugins: [
		react(),
		apiDevPlugin(),
	],

	resolve: {
		dedupe: ["react", "react-dom", "react-router-dom"],
		alias: {
			nothing: "/src/fallbacks/missingModule.ts",
			"@/api": path.resolve(__dirname, "./src/server/api"),
			"@": path.resolve(__dirname, "./src"),
		},
	},

	optimizeDeps: {
		include: ["react", "react-dom", "react-router-dom", "motion/react"],
	},

	ssr: {
		noExternal: isSsrBuild ? true : undefined,
	},

	server: {
		host: process.env.HOST || "0.0.0.0",
		port: parseInt(process.env.PORT || "5173"),
		strictPort: !!process.env.PORT,
		allowedHosts,
		cors: {
			origin: corsOrigins,
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "Accept", "User-Agent"],
		},
		hmr: {
			overlay: false,
		},
		watch: {
			ignored: ["**/dist/**", "**/*.mp4", "**/*.webm", "**/*.png", "**/*.jpg", "**/*.jpeg"],
		},
		// Pre-transform the entry chain on dev-server start so the FIRST iframe
		// request doesn't pay the full cold on-demand transpile cost. Paired with
		// the container's pre-start `vite optimize` (container-scripts/preview/
		// nomad_setup.sh), this shrinks the mount→IFRAME_READY window that the
		// builder's recovery logic waits on.
		warmup: {
			clientFiles: ["./src/main.tsx", "./src/App.tsx"],
		},
	},

	preview: {
		host: process.env.HOST || "0.0.0.0",
		port: parseInt(process.env.PORT || "5173"),
		strictPort: !!process.env.PORT,
		allowedHosts,
		cors: {
			origin: corsOrigins,
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "Accept", "User-Agent"],
		},
	},

	build: isSsrBuild
		? {
				outDir: "api",
				emptyOutDir: false,
				copyPublicDir: false,
				ssr: "src/server/entry.ts",
				rollupOptions: {
					output: {
						format: "es",
						entryFileNames: "index.js",
						chunkFileNames: "_bin/[name]-[hash].js",
						banner: "import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);",
					},
				},
			}
		: {
				outDir: "dist",
				emptyOutDir: true,
				copyPublicDir: true,
				sourcemap: true,
				rollupOptions: {
					output: {
							manualChunks: (id: string) => {
								// ── Admin-only: CMS editors + block components + page renderers
								// (lazy-loaded — public users never download these)
								if (
									id.includes('/pages/admin') ||
									id.includes('/components/cms/') ||
									id.includes('/components/RichTextEditor') ||
									id.includes('/lib/cms-blocks') ||
									id.includes('lexical') ||
									id.includes('@tiptap/react') ||
									id.includes('@tiptap/starter-kit') ||
									id.includes('@tiptap/core') ||
									id.includes('@tiptap/extension') ||
									id.includes('@tiptap/pm')
								) {
									if (
										id.includes('lexical') ||
										id.includes('@tiptap/react') ||
										id.includes('@tiptap/starter-kit') ||
										id.includes('@tiptap/core') ||
										id.includes('@tiptap/extension') ||
										id.includes('@tiptap/pm')
									) return 'editor';
									return 'admin';
								}
								// ── Third-party vendor chunks ──
								if (id.includes('react-router-dom') || id.includes('react-router')) return 'router';
								if (id.includes('@tanstack/react-query')) return 'query';
								if (id.includes('motion/react') || id.includes('framer-motion')) return 'motion';
								if (id.includes('lucide-react')) return 'lucide';
								if (id.includes('@radix-ui/')) return 'radix-ui';
								if (
									id.includes('/node_modules/react/') ||
									id.includes('/node_modules/react-dom/')
								) return 'react-vendor';
								return undefined; // let Rollup decide for everything else
							},
					},
				},
			},
}));
