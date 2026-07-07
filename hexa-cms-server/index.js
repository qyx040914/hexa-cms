const fs = require('fs');
const path = require('path');
const colors = require('colors');
const add = require('./math');

const dataFile = path.join(__dirname, 'mock-article.txt');

console.log('Hexa-CMS Node.js 后端练习启动'.cyan);
console.log(('模块复用示例：1 + 1 = ' + add(1, 1)).green);
console.log('1. 开始通知系统异步读取文章数据'.yellow);

fs.readFile(dataFile, 'utf8', function handleRead(err, data) {
  if (err) {
    console.error('读取文件失败：'.red, err.message);
    return;
  }

  console.log('3. 文件读取完成，内容如下：'.green);
  console.log(data);
});

console.log('2. 不等待文件读取，主线程继续处理其他任务'.blue);
