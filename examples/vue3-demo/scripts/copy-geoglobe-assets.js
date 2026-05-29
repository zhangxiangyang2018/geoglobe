/**
 * 将 node_modules/geoglobe-3d/dist 整个目录复制到 public/geoglobe
 */
import { cpSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const src = resolve(root, 'node_modules/geoglobe-3d/dist');
const dest = resolve(root, 'public/geoglobe');

if (!existsSync(src)) {
  console.error('❌ 找不到 node_modules/geoglobe-3d/dist，请先运行 npm install');
  process.exit(1);
}

cpSync(src, dest, { recursive: true });
console.log('✅ 已复制 geoglobe-3d/dist -> public/geoglobe');
console.log('\n🎉 静态资源复制完成！');
