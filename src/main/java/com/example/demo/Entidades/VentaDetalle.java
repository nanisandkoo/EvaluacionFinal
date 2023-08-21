package com.example.demo.Entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VentaDetalle {

    @Id
    @GeneratedValue
    private Long id;
    private String NroBoleta;

    @ManyToOne()
    @JoinColumn(name = "id_venta")
    private VentaLugar venta;

    @ManyToOne()
    @JoinColumn(name = "id_producto")
    private Producto producto;
    private int cantidad;

    public VentaDetalle() {
    }

    public VentaDetalle(String nroBoleta, VentaLugar venta, Producto producto, int cantidad) {
        this.NroBoleta = nroBoleta;
        this.venta = venta;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VentaLugar getVenta() {
        return venta;
    }

    public void setVenta(VentaLugar venta) {
        this.venta = venta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getNroBoleta() {
        return NroBoleta;
    }

    public void setNroBoleta(String nroBoleta) {
        NroBoleta = nroBoleta;
    }
}