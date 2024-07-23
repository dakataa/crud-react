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
		resolve: {
			alias: [
				{
					find: /~(.+)/,
					replacement: join(process.cwd(), 'node_modules/$1'),
				}
			]
		}
	};
});
