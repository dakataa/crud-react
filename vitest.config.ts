import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    resolve: { alias: { '@crud-react': fileURLToPath(new URL('./src', import.meta.url)) } },
    test: { environment: 'jsdom', include: ['tests/**/*.test.ts?(x)'] }
});
