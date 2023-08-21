const React = require("react");
const { useState, useEffect } = require("react");
const { Link, useParams } = require("react-router-dom");
const client = require("../client");

const PageNuevoDetalle = () => {
  const [Lugar, setLugar] = useState([]);
  const [Producto, setProducto] = useState([]);
  const [nroboleta, setNroboleta] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [idproducto, setId_Producto] = useState("");
  const [idlugar, setId_lugar] = useState("");

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (!nroboleta || !idlugar || !idproducto || !cantidad) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    client({
      method: "POST",
      path: "/api/ventadetalles",
      entity: {
        nroBoleta: nroboleta,
        venta: "http://localhost:8080/api/ventas/" + idlugar,
        producto: "http://localhost:8080/api/productos/" + idproducto,
        cantidad: cantidad,
      },
      headers: { "Content-Type": "application/json" },
    }).done((response) => {
      console.log("Respuesta del servidor:", response);
      alert("Datos registrados Correctamente");
      window.location = '/';
    });
  };

  useEffect(() => {
    client({
      method: "GET",
      path: "/api/ventas",
    }).done((response) => {
      let venta2 = [];
      response.entity._embedded.ventas.map((producto) => {
        venta2.push({
          value: producto._links.self.href.split("/").slice(-1),
          label: producto.lugar,
        });
      });
      setLugar(venta2);
    });
    client({
      method: "GET",
      path: "/api/productos",
    }).done((response) => {
      let productos2 = [];
      response.entity._embedded.productos.map((producto) => {
        productos2.push({
          value: producto._links.self.href.split("/").slice(-1),
          label: producto.nombre,
        });
      });
      setProducto(productos2);
    });
  }, []);

  return (
    <div class="container">
      <h1>Nuevo Instrumento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nroboleta">Nro Boleta:</label>
        <input
          type="text"
          id="nroboleta"
          name="nroboleta"
          onChange={(e) => setNroboleta(e.target.value)}
        />
        <br />
        <label htmlFor="lugar">Lugar</label>
        <select
          name="lugar"
          id="lugar"
          onChange={(e) => {
            console.log("Nuevo valor de lugar:", e.target.value);
            setId_lugar(e.target.value);
          }}
        >
          <option value="0">Seleccione un lugar</option>
          {Lugar.map((lugar) => {
            return (
              <option key={lugar.value} value={lugar.value}>
                {lugar.label}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="producto">Producto</label>
        <select
          name="producto"
          id="producto"
          onChange={(e) => {
            console.log("Nuevo valor de producto:", e.target.value);
            setId_Producto(e.target.value);
          }}
        >
          <option value="0">Seleccione un lugar</option>
          {Producto.map((producto) => {
            return (
              <option key={producto.value} value={producto.value}>
                {producto.label}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="text"
          id="cantidad"
          name="cantidad"
          onChange={(e) => setCantidad(e.target.value)}
        />
        <br />
        <input type="submit" value="Nuevo detalle" />
      </form>
      <Link to="/">Volver</Link>
    </div>
  );
};
module.exports = PageNuevoDetalle;