import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import fs from 'fs';
import path from 'path';

// Function to recursively fetch all files with a given extension in a directory
const getFiles = (dir, ext, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFiles(filePath, ext, fileList);
        } else if (path.extname(file) === ext) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

// Get all CSS and JS files in the resources folder
const cssFiles = getFiles('resources/css', '.css');
const jsFiles = getFiles('resources/js', '.js');

export default defineConfig({
    plugins: [
        laravel({
            publicDirectory: 'public',
            input: [...cssFiles, ...jsFiles], // Include all CSS and JS files
            refresh: false,
        }),
    ],
});
