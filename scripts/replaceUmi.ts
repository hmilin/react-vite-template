// 替换规则
// {history} from 'umi' => use history from '@/utils/history'
// {request} from 'umi' => request from '@/utils/request'
// {useRequest} from 'umi' => {useRequest} from '@/utils/request'
// {Outlet} from 'umi' => Outlet from 'react-router-dom'
// {Link, NavLink, Outlet, useLocation, useParams, useSearchParams} from 'umi' => 'react-router-dom'

import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
const path = require('path');

// 转换策略
const strategies = {
  history: {
    from: '@/utils/history',
    default: true,
  },
  request: {
    from: '@/utils/request',
    default: true,
  },
  useRequest: {
    from: '@/utils/request',
    default: false,
  },
  Link: {
    from: 'react-router-dom',
    default: false,
  },
  Outlet: {
    from: 'react-router-dom',
    default: false,
  },
  NavLink: {
    from: 'react-router-dom',
    default: false,
  },
  useLocation: {
    from: 'react-router-dom',
    default: false,
  },
  useParams: {
    from: 'react-router-dom',
    default: false,
  },
  useSearchParams: {
    from: 'react-router-dom',
    default: false,
  },
} as const;

try {
  const args = process.argv.slice(2);
  const dirPath = args[0];
  if (!dirPath) {
    throw '缺少目录参数';
  }
  const files = getFilesFromDir(dirPath);

  console.log('files', files);
  for (const filepath of files) {
    const file = readFileSync(filepath);
    const content = file.toString();
    // 匹配所有umi导入语句
    const umiImports = content.match(/(import\s+\{[\s\S]?.*\}\s+from ["']umi)(["']);?/g);
    // 找出该文件中引入的模块
    const modules: string[] = [];
    umiImports?.forEach((i) => {
      const names = i.match(/\{[\s\S]?.*\}/)?.[0]?.match(/(?=(,|\{))?\w+/g);
      Array.prototype.push.apply(modules, names);
    });
    console.log('引用的umi模块: ', modules);

    const froms: Record<string, any[]> = {};
    modules.forEach((m) => {
      const strategy = strategies[m];
      if (strategy) {
        // 根据from来分组
        froms[strategy.from] = [...(froms[strategy.from] ?? []), { ...strategy, module: m }];
      }
    });

    let inputContent = '';

    for (const from in froms) {
      let defaultImport = '';
      let subImports: string[] = [];
      for (const strategy of froms[from]) {
        strategy?.default ? (defaultImport = strategy.module) : subImports.push(strategy.module);
      }
      const targets = `${defaultImport}${subImports?.length && defaultImport ? ' , ' : ''}${
        subImports?.length ? `{ ${subImports.join(' , ')} }` : ''
      }`;
      inputContent += `${inputContent ? '\n' : ''}import ${targets} from '${from}';`;
    }

    console.log('新的导入语句为：', inputContent);

    let newContent = content;
    umiImports?.forEach((item, i) => {
      // 新的导入语句替换在第一个位置，后面的清空
      newContent = newContent?.replace(item, i === 0 ? inputContent : '');
    });

    writeFileSync(filepath, newContent, 'utf-8');
  }
} catch (err) {
  console.error(err);
}

// 获取目录下所有文件的路径
function getFilesFromDir(dirPath: string) {
  const fullPath = path.resolve(dirPath);
  const filePaths: string[] = [];
  const files = readdirSync(fullPath);
  files.forEach((fileName) => {
    // 当前文件绝对路径
    const fileDir = path.join(fullPath, fileName);
    // 获取文件信息
    const stats = statSync(fileDir);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      filePaths.push(fileDir);
    } else if (isDir) {
      Array.prototype.push.apply(filePaths, getFilesFromDir(fileDir));
    }
  });
  return filePaths;
}
