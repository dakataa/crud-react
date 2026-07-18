import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {dirname, join, resolve} from "path";
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'node:url'
import pkg from "./package.json";

const __dirname = dirname(fileURLToPath(import.meta.url))
const peerDeps = Object.keys(pkg.peerDependencies ?? {});

export default defineConfig({
        build: {
            lib: {
                name: "crud",
                formats: ["es"],
                entry: resolve(__dirname, 'src/main.ts'),
            },
            rolldownOptions: {
                external: (id) =>
                    peerDeps.some(dep => id === dep || id.startsWith(`${dep}/`)),
            }
        },
        plugins: [
            react(),
            dts({
                tsconfigPath: 'tsconfig.build.json',
            })
        ],
        envPrefix: 'CRUD_',
        resolve: {
            tsconfigPaths: true,
            alias: [
                {
                    find: /~(.+)/,
                    replacement: join(process.cwd(), 'node_modules/$1'),
                },
                {
                    find: /^@crud-react\/(.+)/,
                    replacement: join(process.cwd(), '/src/$1'),
                }
            ]
        }
});
