export interface IFormularioLibro {
  titulo_libro: string;
  autor_libro: string;
  edicion_libro: string;
  anio_libro: string;
  editorial_libro: string;
  pais_libro: string;
  foto_libro: string;
  categoria_libro: string;
}

export interface IFormularioRegistro {
  nombre_usuario: string;
  email_usuario: string;
  contraseña_usuario: string;
}

export interface IUsuarioLocal {
  id: string;
  nombre_usuario: string;
}
