const colors = require('colors');

const fetchUsersCount = () => new Promise((resolve) => setTimeout(() => resolve(120), 1000));
const fetchLatestPosts = () => new Promise((resolve) => setTimeout(() => resolve(['文章A', '文章B']), 1000));
const fetchSystemLogs = () => new Promise((resolve) => setTimeout(() => resolve('一切正常'), 1000));

async function loadCMSDashboard() {
  console.time('CMS面板加载耗时');

  try {
    const [users, posts, logs] = await Promise.all([
      fetchUsersCount(),
      fetchLatestPosts(),
      fetchSystemLogs(),
    ]);

    console.log(`获取成功！用户数: ${users}, 最新文章: ${posts.length}篇, 状态: ${logs}`.green);
  } catch (err) {
    console.error('Dashboard 加载失败：'.red, err.message);
  }

  console.timeEnd('CMS面板加载耗时');
}

loadCMSDashboard();
