# php-todo-list
Backend PHP and Frontend HTML5, CSS3 and Vanilla JavaScript

Consideraciones:

Podría utilizar un patrón Repository para el manejo de base de datos, pero para la demo, creo que es mas rápido hacerlo mediante queries.

Podría haber utilizado un requisito de Composer para manejar ficheros ENV. Pero por comodidad he utilizado la creación de una clase de configuración.

La base de datos no controla algunos casos, como por ejemplo la inserccion de duplicados, dado que es imposible que se inserte un ToDo duplicado por la estructura de la base de datos.

He añadido la clausula ORDER BY a la consulta de listado, para facilitar el post tratamiento de los datos previa respuesta del API. Esto no sería necesario y seria un elemento eliminable si la performance de la query fuese baja.

Me faltaria añadir paginacion y segmentacion de los resultados para organizar mejor la informacion al mostrarla.

Me gustaría mover el requisito de conectarse a base de datos, a un punto de la aplicación que se haya validado la route para saber si es correcta o ha de mostrar un 404, que no necesitaría conectarse a base de datos para nada. -> SOLUCIONADO

El mayor problema que me he encontrado y no he sabido solucionar es que al usar fetchAPI y tratar de enviar un POST con Content-Type: application/json mode: cors me daba todo el rato error de CORS.
Tras mucho revisar y perder muchas horas, he visto que la unica solucion era cambiar de metodo.
Por ese motivo envio los datos en el POST mediante URLEncode

Me pasa lo mismo con el REMOVE. El CORS me esta fastidiando con el fetchAPI y no se porque.
Voy a habilitar una trampa para poder hacer los DELETES usando GET.

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

-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para phptodolist
DROP DATABASE IF EXISTS `phptodolist`;
CREATE DATABASE IF NOT EXISTS `phptodolist` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `phptodolist`;

-- Volcando estructura para tabla phptodolist.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Categories for Todos';

-- Volcando datos para la tabla phptodolist.categories: ~3 rows (aproximadamente)
DELETE FROM `categories`;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`) VALUES
	(1, 'PHP'),
	(2, 'CSS'),
	(3, 'JavaScript');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Volcando estructura para tabla phptodolist.categories_todos
DROP TABLE IF EXISTS `categories_todos`;
CREATE TABLE IF NOT EXISTS `categories_todos` (
  `id_todo` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id_todo`,`id_category`),
  KEY `FK2_categories` (`id_category`),
  CONSTRAINT `FK1_Todos` FOREIGN KEY (`id_todo`) REFERENCES `todos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK2_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Relational table for Todos and Categories';

-- Volcando datos para la tabla phptodolist.categories_todos: ~22 rows (aproximadamente)
DELETE FROM `categories_todos`;
/*!40000 ALTER TABLE `categories_todos` DISABLE KEYS */;
INSERT INTO `categories_todos` (`id_todo`, `id_category`) VALUES
	(1, 1),
	(1, 2),
	(1, 3);
/*!40000 ALTER TABLE `categories_todos` ENABLE KEYS */;

-- Volcando estructura para tabla phptodolist.todos
DROP TABLE IF EXISTS `todos`;
CREATE TABLE IF NOT EXISTS `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo` varchar(600) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Todo table';

-- Volcando datos para la tabla phptodolist.todos: ~30 rows (aproximadamente)
DELETE FROM `todos`;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` (`id`, `todo`) VALUES
	(1, 'Todo Test');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


Creación de usuario:

CREATE USER 'phptodolist'@'localhost' IDENTIFIED BY 'phptodolist';
GRANT USAGE ON *.* TO 'phptodolist'@'localhost';
GRANT SELECT, EXECUTE, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON `phptodolist`.* TO 'phptodolist'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'phptodolist'@'localhost';

