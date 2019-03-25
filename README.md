# Servicio TMDB 

Implementación de un servicio que consume la api de [`https://developers.themoviedb.org`]. las
busquedas implementadas se realizaron por palabra clave y por identificador:

```
https://api.themoviedb.org/3/search/multi?api_key={api_key}&query={quey}&language=es-CO&page={page}
http://api.themoviedb.org/3/movie/:id?api_key={api_key}&language=es-CO
http://api.themoviedb.org/3/tv/:id?api_key={api_key}&language=es-CO
http://api.themoviedb.org/3/people/:id?api_key={api_key}&language=es-CO
```

## Librerias y herramientas usadas

* Angular 1.7.5
* Bootstrap 4.2.1

Para la generación inicial de la aplicación se clono de github el repositorio [`https://github.com/angular/angular-seed`] 
que provee una estructura básica de carpetas y permite un inicio rápido para empezar a codificar. 
Despues de clonar el repositorio se instalaron las dependencias.

```
npm install
```

El servidor se puede ejecutar con:

```
npm start
```

## Directivas

Para el desarrollo se crearon 2 directivas: `modalDialog` y `itemInfo`

La primera para la gestión de una ventana modal en la que se muestra el detalle de un item seleccionado, 
recibe como parametros: 

* `showopen` Indica si el modal es visible
* `itemselect` Elemento seleccionado
* `templateUser` Url de la plantilla con el contenido interno que tendra el modal

La directiva tiene las siguientes dependencias, que permiten el remplazar/insertar el contenido de la plantilla
que se envía como parametro

* `$templateCache`
* `$compile`
* `$http`

La segunda para mostrar el contenido de las busquedas realizadas, recibe como parametro:

* `item` Item del resultado de la consulta
* `clickOn` Evento que desencadena el abrir el modal con el detalle

Para mostrar la lista de resultado se uso la directiva `angularUtils.directives.dirPagination` que es una extensión
de la librería propia de angular `ngRepeat`, la cual permite manejar la paginación.

## Fitros

Se uso un filtro para mostrar si el resultado era una Película, Persona o Programa de tv.

## Servicio

El único servicio usado es `moviesAPIservice` el cual es un `factory` que encapsula los 2 tipos
de consultas implementadas. Sus dependencias son:

* `$http`
* `APIKEY` Constante
* `URLAPI` Constante