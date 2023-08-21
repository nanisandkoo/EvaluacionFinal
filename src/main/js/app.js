const React = require('react');
const ReactDOM = require('react-dom');
const {createBrowserRouter, RouterProvider} = require('react-router-dom');

const PageHome = require('./pages/home');
const PageNuevoProducto = require('./pages/nuevo-producto');
const PageNuevoDetalle = require('./pages/nuevo-detalle');
const PageNuevoLugar = require('./pages/nuevo-lugar');
const PageVerDetalle = require('./pages/ver-detalle');
const PageEditarDetalle = require('./pages/editar-detalle');
const PageEditarProducto = require('./pages/editar-producto');
const PageEditarLugar = require('./pages/editar-lugar');


const router = createBrowserRouter([
	{path: '/', element: <PageHome />},
	{path: '/nuevo-producto', element: <PageNuevoProducto />},
	{path: '/nuevo-detalle', element: <PageNuevoDetalle />},
	{path: '/nuevo-lugar', element: <PageNuevoLugar />},
	{path: '/ver-detalle/:id', element: <PageVerDetalle />},
	{path: '/editar-detalle/:id', element: <PageEditarDetalle />},
	{path: '/editar-producto/:id', element: <PageEditarProducto />},
	{path: '/editar-lugar/:id', element: <PageEditarLugar />},

])


ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById('react')
)