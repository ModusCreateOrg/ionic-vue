import fs from 'fs';
import path from 'path';

['dist', 'types'].forEach(dir => {
  fs.rmdirSync(path.join(__dirname, '../', dir), { recursive: true });
  console.info(`Removed ${dir}/`);
});
