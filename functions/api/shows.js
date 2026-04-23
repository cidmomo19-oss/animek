// Method GET: Buat nampilin daftar film/anime di halaman Utama (index)
export async function onRequestGet(context) {
    const { env } = context;
    try {
        // Tarik semua data shows terbaru
        const { results } = await env.DB.prepare("SELECT * FROM shows ORDER BY created_at DESC").all();
        return Response.json(results);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// Method POST: Buat nambahin film/anime baru dari halaman Admin
export async function onRequestPost(context) {
    const { env, request } = context;
    try {
        const data = await request.json();
        
        const info = await env.DB.prepare(
            `INSERT INTO shows (title, synopsis, poster_url, category, release_year, genre, studio) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            data.title, data.synopsis, data.poster_url, data.category, 
            data.release_year, data.genre, data.studio
        ).run();

        return Response.json({ success: true, message: "Berhasil nambah judul!" });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
