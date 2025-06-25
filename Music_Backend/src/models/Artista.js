import connection from "../utils/db.js";
class Artista{
    //metodo para obtener todos los artistas
    async getAllArtistas(){
        try {
            const [rows] = await connection.query("SELECT * FROM artistas");
            return rows;
        } catch (error) {
           throw new Error("Error al obtener los artistas" + error.message);
        }
    }

    //metodo para obtener un artista por su id
    async getArtistaById(id){
        try {
            const [rows] = await connection.query("SELECT * FROM artistas WHERE artista_id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Artista no encontrado");
            }  
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el artista: " + error.message);
        }
    }

    // Método para obtener un artista por cada género
async getArtistasDestacadosPorGenero() {
  try {
    const [rows] = await connection.query(`
      SELECT 
        gm.genero_id,
        gm.nombre_genero,
        a.artista_id,
        a.nombre_artista
      FROM generos_musicales gm
      JOIN artista_genero ag ON gm.genero_id = ag.genero_id
      JOIN artistas a ON a.artista_id = ag.artista_id
      WHERE (gm.genero_id, a.artista_id) IN (
        SELECT 
          ag2.genero_id,
          MIN(ag2.artista_id)
        FROM artista_genero ag2
        GROUP BY ag2.genero_id
      )
    `);
    return rows;
  } catch (error) {
    throw new Error("Error al obtener artistas destacados por género: " + error.message);
  }
}

//metodo para obtener artitas con sus respectivos generos musicales
async getArtistasPorGeneroId(generoId) {
  const [rows] = await connection.query(`
    SELECT 
      a.artista_id,
      a.nombre_artista
    FROM artistas a
    JOIN artista_genero ag ON a.artista_id = ag.artista_id
    JOIN generos_musicales gm ON gm.genero_id = ag.genero_id
    WHERE gm.genero_id = ?
  `, [generoId]);

  return rows;
}

}
export default Artista;