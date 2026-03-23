import { resolve } from 'path'
import { readdirSync } from 'fs'
import { defineConfig } from 'vite'

const rootHtmlFiles = readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(__dirname, file);
    return entries;
  }, {});

export default defineConfig({
  build: {
	  rollupOptions: {
		input: rootHtmlFiles}
  },
	base: "./"
})
