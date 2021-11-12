# php-todo-list
Backend PHP and Frontend HTML5, CSS3 and Vanilla JavaScript

Consideraciones:

Podría utilizar un patrón Repository para el manejo de base de datos, pero para la demo, creo que es mas rápido hacerlo mediante queries.

Podría haber utilizado un requisito de Composer para manejar ficheros ENV. Pero por comodidad he utilizado la creación de una clase de configuración.

Primero iniciamos el Backend:

Desde una terminal, navegamos al directorio del proyecto, entramos en la carpeta back.
Desde la carpeta back escribimos el siguiente comando:
$ php -S localhost:8080 y pulsamos enter.
Esto nos dejara corriendo un servidor ligero de PHP apuntando al backend.

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

