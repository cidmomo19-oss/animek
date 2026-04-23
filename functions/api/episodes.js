// Method GET: Buat narik episode berdasarkan ID film/anime pas pop-up diklik
export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const show_id = url.searchParams.get("show_id");

    if (!show_id) return Response.json([]);

    try {
        const { results } = await env.DB.prepare(
            "SELECT * FROM episodes WHERE show_id = ? ORDER BY episode_number ASC"
        ).bind(show_id).all();
        return Response.json(results);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// Method POST: Buat nambah episode nanti di halaman admin
export async function onRequestPost(context) {
    const { env, request } = context;
    try {
        const data = await request.json();
        await env.DB.prepare(
            `INSERT INTO episodes (show_id, episode_number, embed_url) VALUES (?, ?, ?)`
        ).bind(data.show_id, data.episode_number, data.embed_url).run();
        
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
