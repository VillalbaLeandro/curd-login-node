CRUD de Usuarios:
* Listar todos los usuarios:
-Método: GET
-Ruta: {{url}}/api/usuarios
  -Parámetros Opcionales:
        -limite: Número de usuarios a mostrar (defecto = 5)
        -desde: Índice desde el cual comenzar a mostrar usuarios (defecto = 0)
----------------------------------------------------------------------------        
Buscar usuario por nombre o correo:
-Método: GET
-Ruta: {{url}}/api/usuarios/search
Parámetros:
    -correo: Correo electrónico del usuario a buscar
----------------------------------------------------------------------------        
Actualizar usuario:
-Método: PUT
-Ruta: {{url}}/api/usuarios/:id
Cuerpo de la Solicitud:
    -correo: Nuevo correo electrónico del usuario
    -passwordActual: Contraseña actual del usuario
    -newPassword: Nueva contraseña del usuario
Validaciones:
    -id: Debe ser un ID válido y existir en la base de datos.
    -correo: Debe ser un correo electrónico válido.
----------------------------------------------------------------------------        
Crear usuario:
-Método: POST
-Ruta: {{url}}/api/usuarios
Cuerpo de la Solicitud:
    -correo: Correo electrónico del usuario
    -password: Contraseña del usuario
Validaciones:
    -correo: Debe ser un correo electrónico válido y no estar registrado en el sistema.
    -password: La contraseña es requerida.
------------------------------------------------------------------------------        
Eliminar usuario:
    -Método: DELETE
    -Ruta: {{url}}/api/usuarios/:id
Parámetros:
    -id: ID del usuario a eliminar
Validaciones:
    id: Debe ser un ID válido y existir en la base de datos.
------------------------------------------------------------------------------        
Proceso de Login:
Iniciar Sesión:
-Método: POST
-Ruta: {{url}}/api/auth/login
Cuerpo de la Solicitud:
    -correo: Correo electrónico del usuario
    -password: Contraseña del usuario
Validaciones:
    -correo: Debe ser un correo electrónico válido.
    -password: La contraseña es requerida.
