import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { defineConfig } from 'vite'

function getHtmlFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = resolve(dir, file);
    
    if (file === 'node_modules' || file === 'dist' || file.startsWith('.')) continue;
    
    if (statSync(fullPath).isDirectory()) {
      getHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allHtmlFiles = getHtmlFiles(__dirname);
const inputFiles = allHtmlFiles.reduce((entries, file) => {
  const name = file.replace(__dirname + '/', '').replace('.html', '').replace(/\//g, '_');
  entries[name] = file;
  return entries;
}, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: inputFiles
    }
  },
  base: "./"
})
