import { IFormularioLibro } from '../libs/interfaces'
import Libro from '../Models/Libros'

export async function agregarLibro(params: IFormularioLibro): Promise<Boolean> {

    const nuevoLibro = await Libro.create({
        autor: params.autor_libro,
        titulo: params.titulo_libro,
        edicion: params.edicion_libro,
        anio: params.anio_libro,
        editorial: params.editorial_libro,
        pais: params.pais_libro,
        foto_link: params.foto_libro,
        categoria_id: parseInt(params.categoria_libro)
    })

    const state = await nuevoLibro.save();

    if(!state) {
        return false
    }

    return true
}