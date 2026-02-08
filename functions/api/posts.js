// functions/api/posts.js
export async function onRequestGet(context) {
  try {
    const { env } = context;
    // 查询所有评论，按时间倒序（适配前端最新评论在最上面）
    const stmt = env.DB.prepare(`
      SELECT id, content, author, created_at 
      FROM comments 
      ORDER BY created_at DESC
    `);
    const { results } = await stmt.all();

    // 返回 JSON 数据（适配前端 index.html 解析）
    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"  // 解决跨域，确保前端能拿到数据
      }
    });
  } catch (error) {
    // 错误返回（前端能捕获，方便排查）
    return new Response(JSON.stringify({
      success: false,
      message: "查询评论失败",
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}