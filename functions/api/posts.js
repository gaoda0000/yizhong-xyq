// functions/api/posts.js 测试版（仅返回固定JSON，排除数据库问题）
export async function onRequestGet() {
  // 先返回固定数据，验证接口是否能访问
  return new Response(JSON.stringify([
    { id: 1, content: "测试内容", time: "2026-02-08 12:00:00" }
  ]), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}