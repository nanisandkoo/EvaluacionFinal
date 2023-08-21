const React = require("react");
const client = require("../client");
const { Link, useParams} = require('react-router-dom');
const { useState, useEffect } = require("react");

const PageVerDetalle = (props) => {
  let { id } = useParams();
  const [detalle, setDetalle] = useState({});
  const [venta, setVenta] = useState({});
  const [producto, setProducto] = useState({});


  useEffect(() => {
    const url_banda = "/api/ventadetalles/" + id;
    client({
      method: "GET",
      path: url_banda,
    }).done((response) => {
      setDetalle(response.entity);
      // Obtener información de la venta
      client({
        method: "GET",
        path: response.entity._links.venta.href,
      }).done((ventaResponse) => {
        setVenta(ventaResponse.entity);
      });
      // Obtener información del producto
      client({
        method: "GET",
        path: response.entity._links.producto.href,
      }).done((productoResponse) => {
        setProducto(productoResponse.entity);
      });
    });
  }, []);

  return (
    <>
      <h1>Detalles de la Factura</h1>
      <table>
        <tbody>
          <tr>
            <th>Nro Boleta</th>
            <td>{detalle.nroBoleta}</td>
          </tr>
          <tr>
            <th>Cantidad</th>
            <td>{detalle.cantidad}</td>
          </tr>
          <tr>
            <th>Venta</th>
            <td>{venta.lugar}</td>
          </tr>
          <tr>
            <th>Producto</th>
            <td>{producto.nombre}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/">Volver</Link>
    </>
  );
};
module.exports = PageVerDetalle;