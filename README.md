# php-todo-list
Backend PHP and Frontend HTML5, CSS3 and Vanilla JavaScript

Consideraciones:

Podría utilizar un patrón Repository para el manejo de base de datos, pero para la demo, creo que es mas rápido hacerlo mediante queries.

Podría haber utilizado un requisito de Composer para manejar ficheros ENV. Pero por comodidad he utilizado la creación de una clase de configuración.

La base de datos no controla algunos casos, como por ejemplo la inserccion de duplicados, dado que es imposible que se inserte un ToDo duplicado por la estructura de la base de datos.

He añadido la clausula ORDER BY a la consulta de listado, para facilitar el post tratamiento de los datos previa respuesta del API. Esto no sería necesario y seria un elemento eliminable si la performance de la query fuese baja.

Me faltaria añadir paginacion y segmentacion de los resultados para organizar mejor la informacion al mostrarla.

Me gustaría mover el requisito de conectarse a base de datos, a un punto de la aplicación que se haya validado la route para saber si es correcta o ha de mostrar un 404, que no necesitaría conectarse a base de datos para nada. -> SOLUCIONADO

Primero iniciamos el Backend:

Desde una terminal, navegamos al directorio del proyecto, entramos en la carpeta back.
Desde la carpeta back escribimos el siguiente comando:
$ php -S 127.0.0.1:8180 y pulsamos enter.
Esto nos dejara corriendo un servidor ligero de PHP apuntando al backend.
Usamos la ip de Loopback en lugar de "localhost", porque algunos clientes de test rest tienen problemas con la reconversion desde localhost a 127.0.0.1 devolviendo un "Rejected"

Despues iniciar el Frontend:

Desde una terminal, navegamos al directorio del proyecto, entramos en la carpeta front.
Desde la carpeta front escribimos el siguiente comando:
$ php -S localhost:8080 y pulsamos enter.
Esto nos dejara corriendo un servidor ligero de PHP apuntando al frontend.
Ahora en el navegador escribimos la siguiente direccion: 
- http://localhost:8080
Ahora tendremos que ver la web funcionando.

Preparación de la base de datos:

Creación de usuario:

CREATE USER 'phptodolist'@'localhost' IDENTIFIED BY 'phptodolist';
GRANT USAGE ON *.* TO 'phptodolist'@'localhost';
GRANT SELECT, EXECUTE, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON `phptodolist`.* TO 'phptodolist'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'phptodolist'@'localhost';

Creación del esquema completo con datos de ejemplo:

