import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {dirname, extname, join, relative, resolve} from "path";
import dts from 'vite-plugin-dts'
import {fileURLToPath} from 'node:url'
import {globSync} from "node:fs";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(() => {
    return {
        build: {
            lib: {
                name: "crud",
                formats: ["es"],
                entry: resolve(__dirname, 'lib/main.ts'),
            }
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            input: Object.fromEntries(
                globSync(['lib/main.ts']).map((file) => {
                    const entryName = relative(
                        'src',
                        file.slice(0, file.length - extname(file).length)
                    )
                    const entryUrl = fileURLToPath(new URL(file, import.meta.url))
                    return [entryName, entryUrl]
                })
            ),
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'React-dom',
                    'react/jsx-runtime': 'react/jsx-runtime',
                },
            }
        },
        plugins: [
            react(),
            dts({
                tsconfigPath: 'tsconfig.build.json',
            }),
            tsconfigPaths()
        ],
        envPrefix: 'CRUD_',
        resolve: {
            alias: [
                {
                    find: /~(.+)/,
                    replacement: join(process.cwd(), 'node_modules/$1'),
                },
                {
                    find: /^@crud\/(.+)/,
                    replacement: join(process.cwd(), '/crud/$1'),
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
    };
});
