const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');
const { useState } = require('react');

const PageNuevoLugar = () => {

    const [lugar, setLugar] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/ventas',
            entity: { lugar: lugar},
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    }

    return (
        <div class="container">
            <h1>Nuevo Lugar de Venta</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='lugar'>Lugar:</label>
                <input type="text" id="lugar" name="lugar" onChange={(e)=>setLugar(e.target.value)} />
                <br />
                
                <input type="submit" value="Nuevo Lugar" />
            </form>
            <Link to="/">Volver</Link>
        </div>
    )
}
module.exports = PageNuevoLugar;