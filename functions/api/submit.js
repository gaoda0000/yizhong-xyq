// functions/api/submit.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    // 解析前端提交的参数（适配 index.html 的 POST 请求）
    const body = await request.json();
    const { content, author } = body;

    // 校验内容（必填）
    if (!content || content.trim() === '') {
      return new Response(JSON.stringify({
        success: false,
        message: "评论内容不能为空"
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // 写入数据库（适配上面的建表结构）
    const stmt = env.DB.prepare(`
      INSERT INTO comments (content, author) 
      VALUES (?, ?)
    `).bind(content.trim(), author || '匿名');
    
    await stmt.run();

    // 返回成功（前端 index.html 接收后刷新列表）
    return new Response(JSON.stringify({
      success: true,
      message: "评论提交成功"
    }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "提交失败",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}