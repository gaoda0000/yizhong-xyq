export async function onRequestGet(context) {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT * FROM posts ORDER BY id DESC"
        ).all();
        return new Response(JSON.stringify(results || []), {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (error) {
        console.error("查询帖子失败：", error);
        // 出错时也返回空数组（避免前端解析失败）
        return new Response(JSON.stringify([]), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}