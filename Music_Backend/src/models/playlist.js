import db from "../utils/db.js";

export class Playlist {
    //crear una playlist del usuario
static async createPlaylist(id_usuario, nombre, descripcion = null) {
    const [result] = await db.query(
        "INSERT INTO Playlists (nombre, descripcion, id_usuario) VALUES (?, ?, ?)",
        [nombre, descripcion, id_usuario]
    );
    return result.insertId;
}

//agregar una cancion a la playlist
static async addSongToPlaylist(playlist_id, cancion_id, posicion_cancion) {
    const [result] = await db.query(
        `INSERT INTO Playlist_Canciones (playlist_id, cancion_id, posicion_cancion) VALUES (?, ?, ?)`,
        [playlist_id, cancion_id, posicion_cancion]
    );
    return result;
}
// Obtener todas las playlists de un usuario
static async getPlaylistWithSongs(playlist_id) {
    const [rows] = await db.query(
        `
        SELECT 
            p.playlist_id,
            p.nombre AS playlist_nombre,
            p.descripcion,
            p.fecha_creacion,
            c.cancion_id,
            c.titulo_cancion,
            c.duracion,
            c.descripcion AS descripcion_cancion,
            pc.posicion_cancion
        FROM Playlists p
        JOIN Playlist_Canciones pc ON p.playlist_id = pc.playlist_id
        JOIN cancion c ON pc.cancion_id = c.cancion_id
        WHERE p.playlist_id = ?
        ORDER BY pc.posicion_cancion ASC
        `,
        [playlist_id]
    );
    
    return rows;
}
}

export default Playlist;