// 接口路径：GET /api/posts → 查询所有帖子（按发布时间倒序）
export async function onRequestGet(context) {
    try {
        // 从 D1 数据库查询帖子（context.env.DB 对应 Pages 绑定的变量名）
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM posts ORDER BY id DESC" // id 自增，倒序就是最新的在前
        ).all();

        // 返回 JSON 格式的帖子列表
        return new Response(JSON.stringify(results || []), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("查询帖子失败：", error);
        // 出错时返回空数组，避免前端报错
        return new Response(JSON.stringify([]), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
