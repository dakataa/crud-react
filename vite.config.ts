import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {dirname, extname, join, relative, resolve} from "path";
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'node:url'
import {globSync} from "node:fs";
import tsconfigPaths from "vite-tsconfig-paths";
import { externalizeDeps } from 'vite-plugin-externalize-deps'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
        build: {
            lib: {
                name: "crud",
                formats: ["es"],
                entry: resolve(__dirname, 'lib/main.ts'),
            }
        },
        plugins: [
            react(),
            dts({
                tsconfigPath: 'tsconfig.build.json',
            }),
            tsconfigPaths(),
            externalizeDeps()
        ],
        envPrefix: 'CRUD_',
        resolve: {
            alias: [
                {
                    find: /~(.+)/,
                    replacement: join(process.cwd(), 'node_modules/$1'),
                },
                {
                    find: /^@src\/(.+)/,
                    replacement: join(process.cwd(), '/src/$1'),
                }
            ]
        },
        optimizeDeps: {
            exclude: ['@dakataa/requester']
        }
});
