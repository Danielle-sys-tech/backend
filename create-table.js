import { sql } from "./db.js"; // Importa a conexão com o banco de dados MySQL


const createTableQuery = `
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    duration INT
);
`
sql.query(createTableQuery)
    .then(() => {
        console.log("Tabela 'videos' criada ou já existente com sucesso no MySQL");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);
    });


    import { randomUUID } from "node:crypto";
    import { sql } from "./db.js";

    export class DatabaseMYSQL {

        async list(search) {
            let videos;

            if (search) {
                [videos] = await sql.execute(
                    'SELECT * FROM videos WHERE title LIKE ?',
                    [`%${search}%`]
                );
            }else {
                [videos] = await sql.execute('SELECT * FROM videos');
            }

            return videos;
            }

            async create(video) {
                const videoId = random();
                const { title, description, duration } = video;

                await sql.execute(
                    'INSERT INTO videos (id, title, description, duration) VALUES (?, ?, ?, ?)',
                    [videoId, title, description, duration]
                );
            }

            async update(id, video) {
                const { title, description, duration } = video;
                await sql.execute(
                    'UPDATE videos SET title = title = ?,  description = ? duration = ? WHERE id = id = ?',
                    [title, description, duration, id]
                );
            }

            async delete(id) {
                await sql.execute('DELETE FROM videos WHERE id = ?', [id]);

            }
        }
    
