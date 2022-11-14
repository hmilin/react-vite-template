'use strict';
// 替换规则
// {history} from 'umi' => use history from '@/utils/history'
// {request} from 'umi' => request from '@/utils/request'
// {useRequest} from 'umi' => {useRequest} from '@/utils/request'
// {Outlet} from 'umi' => Outlet from 'react-router-dom'
// {Link, NavLink, Outlet, useLocation, useParams, useSearchParams} from 'umi' => 'react-router-dom'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
var fs_1 = require('fs');
var path = require('path');
// 转换策略
var strategies = {
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
};
try {
  var args = process.argv.slice(2);
  var dirPath = args[0];
  if (!dirPath) {
    throw '缺少目录参数';
  }
  var files = getFilesFromDir(dirPath);
  console.log('files', files);
  var _loop_1 = function (filepath) {
    var file = (0, fs_1.readFileSync)(filepath);
    var content = file.toString();
    // 匹配所有umi导入语句
    var umiImports = content.match(/(import\s+\{[\s\S]?.*\}\s+from ["']umi)(["']);?/g);
    // 找出该文件中引入的模块
    var modules = [];
    umiImports === null || umiImports === void 0
      ? void 0
      : umiImports.forEach(function (i) {
          var _a, _b;
          var names =
            (_b = (_a = i.match(/\{[\s\S]?.*\}/)) === null || _a === void 0 ? void 0 : _a[0]) ===
              null || _b === void 0
              ? void 0
              : _b.match(/(?=(,|\{))?\w+/g);
          Array.prototype.push.apply(modules, names);
        });
    console.log('引用的umi模块: ', modules);
    var froms = {};
    modules.forEach(function (m) {
      var _a;
      var strategy = strategies[m];
      if (strategy) {
        // 根据from来分组
        froms[strategy.from] = __spreadArray(
          __spreadArray([], (_a = froms[strategy.from]) !== null && _a !== void 0 ? _a : [], true),
          [__assign(__assign({}, strategy), { module: m })],
          false,
        );
      }
    });
    var inputContent = '';
    for (var from in froms) {
      var defaultImport = '';
      var subImports = [];
      for (var _a = 0, _b = froms[from]; _a < _b.length; _a++) {
        var strategy = _b[_a];
        (strategy === null || strategy === void 0 ? void 0 : strategy['default'])
          ? (defaultImport = strategy.module)
          : subImports.push(strategy.module);
      }
      var targets = ''
        .concat(defaultImport)
        .concat(
          (subImports === null || subImports === void 0 ? void 0 : subImports.length) &&
            defaultImport
            ? ' , '
            : '',
        )
        .concat(
          (subImports === null || subImports === void 0 ? void 0 : subImports.length)
            ? '{ '.concat(subImports.join(' , '), ' }')
            : '',
        );
      inputContent += ''
        .concat(inputContent ? '\n' : '', 'import ')
        .concat(targets, " from '")
        .concat(from, "';");
    }
    console.log('新的导入语句为：', inputContent);
    var newContent = content;
    umiImports === null || umiImports === void 0
      ? void 0
      : umiImports.forEach(function (item, i) {
          // 新的导入语句替换在第一个位置，后面的清空
          newContent =
            newContent === null || newContent === void 0
              ? void 0
              : newContent.replace(item, i === 0 ? inputContent : '');
        });
    (0, fs_1.writeFileSync)(filepath, newContent, 'utf-8');
  };
  for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var filepath = files_1[_i];
    _loop_1(filepath);
  }
} catch (err) {
  console.error(err);
}
// 获取目录下所有文件的路径
function getFilesFromDir(dirPath) {
  var fullPath = path.resolve(dirPath);
  var filePaths = [];
  var files = (0, fs_1.readdirSync)(fullPath);
  files.forEach(function (fileName) {
    // 当前文件绝对路径
    var fileDir = path.join(fullPath, fileName);
    // 获取文件信息
    var stats = (0, fs_1.statSync)(fileDir);
    var isFile = stats.isFile();
    var isDir = stats.isDirectory();
    if (isFile) {
      filePaths.push(fileDir);
    } else if (isDir) {
      Array.prototype.push.apply(filePaths, getFilesFromDir(fileDir));
    }
  });
  return filePaths;
}
