# apiecommerce
*https://documenter.getpostman.com/view/24295766/2s9YBz3Fdu#b4544e81-a761-4b23-8970-b937b03a33b5*

# USUARIOS

## **Crear un nuevo usuario**

Ruta: POST https://apie-pied.vercel.app/user/create
-Descripción: Este endpoint se utiliza para crear un nuevo usuario en la aplicación.
-Parámetros de entrada:
- userName (String, obligatorio): El nombre de usuario del nuevo usuario.
- email (String, obligatorio): El correo electrónico del nuevo usuario.
- password (String, obligatorio): La contraseña del nuevo usuario (debe tener al menos 6 caracteres).
- name (String, obligatorio): El nombre del nuevo usuario.
- lastName (String, obligatorio): El apellido del nuevo usuario.
- Respuesta exitosa: El usuario ha sido creado exitosamente.
- Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si ya existe un usuario con el mismo correo electrónico.

## **Verificar un usuario**
Ruta: https://apie-pied.vercel.app/user/verified
-Descripción: Este endpoint se utiliza para verificar a un usuario mediante un código de verificación enviado por correo electrónico.
-Parámetros de entrada:
- email (String, obligatorio): El correo electrónico del usuario que se desea verificar.
- code (String, obligatorio): El código de verificación.
-Respuesta exitosa: El usuario ha sido verificado exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si el código de verificación es incorrecto.

## **Iniciar sesión de usuario**
Ruta: POST https://apie-pied.vercel.app/user/login
-Descripción: Este endpoint se utiliza para que un usuario inicie sesión en la aplicación.
-Parámetros de entrada:
- email (String, obligatorio): El correo electrónico del usuario.
- password (String, obligatorio): La contraseña del usuario (debe tener al menos 6 caracteres).
-Respuesta exitosa: El usuario ha iniciado sesión exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si la contraseña es incorrecta.

## **Obtener información de usuario**
Ruta: GET https://apie-pied.vercel.app/user/get
-Descripción: Este endpoint se utiliza para obtener la información del usuario autenticado.
-Parámetros de entrada: No se requieren parámetros adicionales.
-Respuesta exitosa: Devuelve la información del usuario.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si el usuario no está autenticado.

## **Restablecer la contraseña de un usuario**
Ruta: PATCH https://apie-pied.vercel.app/user/reset
-Descripción: Este endpoint se utiliza para restablecer la contraseña de un usuario.
-Parámetros de entrada:
- email (String, obligatorio): El correo electrónico del usuario.
- password (String, obligatorio): La nueva contraseña del usuario (debe tener al menos 6 caracteres).
-Respuesta exitosa: La contraseña del usuario ha sido restablecida exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede restablecer la contraseña.

# PRODUCTOS 

## **Crear un nuevo producto**
Ruta: POST https://apie-pied.vercel.app/product/create
-Descripción: Este endpoint se utiliza para crear un nuevo producto en la aplicación.
-Parámetros de entrada:
- title (String, obligatorio): El título del producto.
- price (Number, obligatorio): El precio del producto.
- description (String, obligatorio): La descripción del producto.
- ganancia (Number, obligatorio): La ganancia asociada al producto.
- category (String, obligatorio): La categoría a la que pertenece el producto.
- stock (Number, obligatorio): El stock disponible del producto.
-Respuesta exitosa: El producto ha sido creado exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede crear el producto.

## **Obtener todos los productos**
Ruta: GET https://apie-pied.vercel.app/product/get
-Descripción: Este endpoint se utiliza para obtener la lista de todos los productos disponibles.
-Parámetros de entrada: No se requieren parámetros adicionales.
-Respuesta exitosa: Devuelve la lista de productos disponibles.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se pueden obtener los productos.

## **Eliminar un producto**
Ruta: DELETE https://apie-pied.vercel.app/product/delete/:id
-Descripción: Este endpoint se utiliza para eliminar un producto específico por su ID.
-Parámetros de entrada:
- id (String, obligatorio): El ID único del producto que se desea eliminar.
-Respuesta exitosa: El producto ha sido eliminado exitosamente.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se puede eliminar el producto.

## **Actualizar un producto**
Ruta: PATCH https://apie-pied.vercel.app/product/update/:id
-Descripción: Este endpoint se utiliza para actualizar la información de un producto específico por su ID.
-Parámetros de entrada:
- id (String, obligatorio): El ID único del producto que se desea actualizar.
- price (Number, obligatorio): El nuevo precio del producto.
- description (String, obligatorio): La nueva descripción del producto.
- ganancia (Number, obligatorio): La nueva ganancia asociada al producto.
- stock (Number, obligatorio): El nuevo stock disponible del producto.
- Respuesta exitosa: El producto ha sido actualizado exitosamente.
- Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede actualizar el producto.

## **Obtener productos por categoría**
Ruta: GET https://apie-pied.vercel.app/product/category
-Descripción: Este endpoint se utiliza para obtener una lista de productos que pertenecen a una categoría específica.
-Parámetros de entrada:
- name (String, obligatorio): El nombre de la categoría de la que se desean obtener los productos.
-Respuesta exitosa: Devuelve la lista de productos que pertenecen a la categoría especificada.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se pueden obtener los productos de la categoría especificada.

# ORDENES 

## **Obtener todos los pedidos**
Ruta: GET https://apie-pied.vercel.app/order/get
-Descripción: Este endpoint se utiliza para obtener la lista de todos los pedidos realizados.
-Parámetros de entrada: No se requieren parámetros adicionales.
-Respuesta exitosa: Devuelve la lista de pedidos realizados.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se pueden obtener los pedidos.

## **Crear un nuevo pedido**
Ruta: POST https://apie-pied.vercel.app/order/create
-Descripción: Este endpoint se utiliza para crear un nuevo pedido en la aplicación.
-Parámetros de entrada:
- name (String, obligatorio): El nombre del cliente que realiza el pedido.
- cellphone (String, obligatorio): El número de teléfono del cliente.
- email (String, obligatorio): El correo electrónico del cliente.
- direction (String, obligatorio): La dirección de entrega del pedido.
- city (String, obligatorio): La ciudad de entrega del pedido.
- state (String, obligatorio): El estado de entrega del pedido.
- postalCode (String, obligatorio): El código postal de la dirección de entrega.
-- products (Array, obligatorio): Una lista de productos incluidos en el pedido.
-Respuesta exitosa: El pedido ha sido creado exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede crear el pedido.

## **Eliminar un pedido**
Ruta: DELETE https://apie-pied.vercel.app/order/delete/:id
-Descripción: Este endpoint se utiliza para eliminar un pedido específico por su ID.
-Parámetros de entrada:
- id (String, obligatorio): El ID único del pedido que se desea eliminar.
-Respuesta exitosa: El pedido ha sido eliminado exitosamente.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se puede eliminar el pedido.

## **Actualizar el estado de un pedido**
Ruta: POST https://apie-pied.vercel.app/order/status/:id
-Descripción: Este endpoint se utiliza para actualizar el estado de un pedido específico por su ID.
-Parámetros de entrada:
- id (String, obligatorio): El ID único del pedido que se desea actualizar.
- status (String, obligatorio): El nuevo estado del pedido.
-Respuesta exitosa: El estado del pedido ha sido actualizado exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede actualizar el estado del pedido.

## **Obtener pedidos por usuario**
Ruta: GET https://apie-pied.vercel.app/order/user/:_id
-Descripción: Este endpoint se utiliza para obtener una lista de pedidos realizados por un usuario específico.
-Parámetros de entrada:
- _id (String, obligatorio): El ID único del usuario para el que se desean obtener los pedidos.
-Respuesta exitosa: Devuelve la lista de pedidos realizados por el usuario especificado.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se pueden obtener los pedidos del usuario.

# CATEGORIAS

## **Crear una nueva categoría**
Ruta: POST https://apie-pied.vercel.app/category/create
-Descripción: Este endpoint se utiliza para crear una nueva categoría en la aplicación.
-Parámetros de entrada:
- name (String, obligatorio): El nombre de la categoría.
- description (String, obligatorio): La descripción de la categoría.
-Respuesta exitosa: La categoría ha sido creada exitosamente.
-Respuesta de error: Puede devolver errores si los datos proporcionados son inválidos o si no se puede crear la categoría.

## **Obtener todas las categorías**
Ruta: GET https://apie-pied.vercel.app/category/get
-Descripción: Este endpoint se utiliza para obtener la lista de todas las categorías disponibles.
-Parámetros de entrada: No se requieren parámetros adicionales.
-Respuesta exitosa: Devuelve la lista de categorías disponibles.
-Respuesta de error: Puede devolver errores si la solicitud no es válida o si no se pueden obtener las categorías.
