const comments = [
  { id: 1, user: 'Alice', content: '文章结构清晰，适合入门。' },
  { id: 2, user: 'Bob', content: '希望补充更多项目案例。' },
];

function CommentPanel() {
  return (
    <section className="content-panel">
      <div className="content-header">
        <div>
          <h2>评论管理</h2>
          <p>使用 map 动态渲染评论列表</p>
        </div>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <article className="comment-item" key={comment.id}>
            <strong>{comment.user}</strong>
            <p>{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CommentPanel;
