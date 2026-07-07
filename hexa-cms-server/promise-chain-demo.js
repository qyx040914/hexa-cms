const path = require('path');
const colors = require('colors');
const { readFilePromise } = require('./file-utils');

const titlesFile = path.join(__dirname, 'titles.json');
const templateFile = path.join(__dirname, 'template.html');

readFilePromise(titlesFile)
  .then((titlesData) => {
    const titles = JSON.parse(titlesData);
    console.log('1. 成功获取到文章标题数据！'.green);
    console.log(('文章数量：' + titles.length).cyan);

    return readFilePromise(templateFile);
  })
  .then((templateData) => {
    console.log('2. 成功获取到 HTML 模板！'.green);
    console.log(('模板长度：' + templateData.length + ' 个字符').cyan);
    console.log('3. Promise 链式调用完成，避免了回调地狱。'.yellow);
  })
  .catch((err) => {
    console.error('发生严重错误，中止渲染：'.red, err.message);
  });
