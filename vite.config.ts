import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import path, {join} from "path";

export default defineConfig(() => {
	return {
		build: {
			outDir: 'build',
		},
		plugins: [react(), tsconfigPaths()],
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
