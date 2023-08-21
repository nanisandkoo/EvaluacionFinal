const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productos: [], ventadetalles: [], ventas: [] };
  }
  componentDidMount() {
    client({ method: "GET", path: "/api/productos" }).done((response) => {
      this.setState({ productos: response.entity._embedded.productos });
    });
    client({ method: "GET", path: "/api/ventadetalles" }).done((response) => {
      this.setState({ ventadetalles: response.entity._embedded.ventadetalles });
    });
    client({ method: "GET", path: "/api/ventas" }).done((response) => {
      this.setState({ ventas: response.entity._embedded.ventas });
    });
  }
  render() {
    return (
      <div class="container">
        <h1>Aplicacion Nayara</h1>
        <div>
          <div>
            <Titulo entidad="Producto" />
            <button class="border border-1 border-primary rounded mb-1">
              <Link to="/nuevo-producto" class="btn-link-unstyled">
                Nuevo Producto
              </Link>
            </button>
            <ProductoList productos={this.state.productos} />
          </div>
          <div>
            <Titulo entidad="Lugar de Venta" />
            <button class="border border-1 border-primary rounded mb-1">
              <Link to="/nuevo-lugar" class="btn-link-unstyled">
                Nuevo Lugar
              </Link>
            </button>
            <VentaList ventas={this.state.ventas} />
          </div>
          <div>
            <Titulo entidad="Detalle de Venta" />
            <button class="border border-1 border-primary rounded mb-1">
              <Link to="/nuevo-detalle" class="btn-link-unstyled">
                Nuevo Detalle
              </Link>
            </button>
            <DetalleList ventadetalles={this.state.ventadetalles} />
          </div>
        </div>
      </div>
    );
  }
}

const Titulo = (props) => {
  return (
    <>
      <hr />
      <h2>{props.entidad}</h2>
      <span>Listado completo de {props.entidad.toLowerCase()}:</span>
      <hr />
    </>
  );
};

class ProductoList extends React.Component {
  render() {
    const productos = this.props.productos.map((producto) => (
      <Producto key={producto._links.self.href} producto={producto} />
    ));
    return (
      <div class="border border-1 border-primary">
        <table class="table table-striped-columns">
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
            {productos}
          </tbody>
        </table>
      </div>
    );
  }
}

class Producto extends React.Component {
  render() {
    const id = this.props.producto._links.self.href.split("/").slice(-1);
    return (
      <tr>
        <td>{this.props.producto.nombre}</td>
        <td>{this.props.producto.precio}</td>
        <td>
          <Link to={`/editar-producto/${id}`}>
            Editar
          </Link>
        </td>
      </tr>
    );
  }
}

class VentaList extends React.Component {
  render() {
    const ventas = this.props.ventas.map((venta) => (
      <Venta key={venta._links.self.href} venta={venta} />
    ));
    return (
      <div class="border border-1 border-primary">
        <table class="table table-striped-columns">
          <tbody>
            <tr>
              <th>Lugar</th>
              <th>Acciones</th>
            </tr>
            {ventas}
          </tbody>
        </table>
      </div>
    );
  }
}

class Venta extends React.Component {
  render() {
    const id = this.props.venta._links.self.href.split("/").slice(-1);
    return (
      <tr>
        <td>{this.props.venta.lugar}</td>
        <td>
          <Link to={`/editar-lugar/${id}`}>
            Editar
          </Link>
        </td>
      </tr>
    );
  }
}

class DetalleList extends React.Component {
  render() {
    const ventadetalles = this.props.ventadetalles.map((detalle) => (
      <Detalle key={detalle._links.self.href} detalle={detalle} />
    ));
    return (
      <div class="border border-1 border-primary">
        <table class="table table-striped-columns">
          <tbody>
            <tr>
              <th>Id Detalle</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
            {ventadetalles}
          </tbody>
        </table>
      </div>
    );
  }
}

class Detalle extends React.Component {
  render() {
    const id = this.props.detalle._links.self.href.split("/").slice(-1);
    return (
      <tr>
        <td>{this.props.detalle.nroBoleta}</td>
        <td>{this.props.detalle.cantidad}</td>
        <td>
          <Link to={`/ver-detalle/${id}`}>
            Ver
          </Link>
          <br></br>
          <Link to={`/editar-detalle/${id}`}>
            Editar
          </Link>
        </td>
      </tr>
    );
  }
}
module.exports = PageHome;