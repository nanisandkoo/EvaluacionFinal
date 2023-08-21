const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState, useEffect } = require("react");

const PageEditarDetalle = (props) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    client({
      method: "PATCH",
      path: "/api/ventadetalles/"+id,
      entity: detalle,venta,producto,
      headers: { "Content-Type": "application/json" },
    }).done((response) => {
      console.log(response);
    });
  };

  return (
    <div class="container">
      <h1>Editar Detalle: {id}</h1>

      <form onSubmit={handleSubmit}>
        <label>Nro Boleta</label>
        <h5>Solo Lectura</h5>
        <input
          class="form-control"
          type="text"
          id="nroBoleta"
          name="nroBoleta"
          value={detalle.nroBoleta}
          onChange={(e) => {
            
            setDetalle({ ...detalle, nroBoleta: e.target.value });
          }}
          readOnly
        />
        <br />

        <label>Cantidad</label>
        <input
          class="form-control"
          type="text"
          name="cantidad"
          value={detalle.cantidad}
          onChange={(e) => {
            setDetalle({ ...detalle, cantidad: e.target.value });
          }}
        />
        <br />

        <label>Venta</label>
        <h5>Solo Lectura</h5>
        <input
          class="form-control"
          type="text"
          name="categoria"
          value={venta.lugar || detalle.cantidad}
          onChange={(e) => {
            setPutDetalle({ ...putdetalle, lugar: e.target.value });
          }}
          readOnly
        />
        <br />

        <label>Producto</label>
        <h5>Solo Lectura</h5>
        <input
          class="form-control"
          type="text"
          name="nombre"
          value={producto.nombre || detalle.cantidad}
          onChange={(e) => {
            setPutDetalle({ ...putdetalle, nombre: e.target.value });
          }}
          readOnly
        />
        <br />
        <input class="btn btn-primary mb-2" type="submit" value={`Editar Detalle ${id}`} />
      </form>


      <button class="btn btn-danger"><Link to="/" class="btn-link-unstyled2">Volver</Link></button>
    </div>
  );
};
module.exports = PageEditarDetalle;