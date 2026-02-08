// 接口路径：POST /api/submit → 发布新帖子
export async function onRequestPost(context) {
    try {
        // 解析前端传递的 JSON 数据（content=帖子内容，time=发布时间）
        const { content, time } = await context.request.json();

        // 校验内容不为空
        if (!content || !time) {
            return new Response(JSON.stringify({ error: "内容或时间不能为空" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 插入 D1 数据库
        await context.env.DB.prepare(
            "INSERT INTO posts (content, time) VALUES (?, ?)" // 占位符防止 SQL 注入
        ).bind(content, time).run(); // 绑定参数并执行

        // 返回成功响应
        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("发布帖子失败：", error);
        return new Response(JSON.stringify({ error: "发布失败" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}