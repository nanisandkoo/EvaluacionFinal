package com.example.demo.Entidades;

import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class VentaLugar {

    private @Id @GeneratedValue Long id;
    private String lugar;

    public VentaLugar() {}

    public VentaLugar(String lugar) {
        this.lugar = lugar;
    }
    @Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		VentaLugar b = (VentaLugar) o;
		return Objects.equals(id, b.id) &&
			Objects.equals(lugar, b.lugar);
	}	
	@Override
	public int hashCode() {

		return Objects.hash(id, lugar);
	}
	@Override
	public String toString() {
		return "VentaLugar{" +
			"id=" + id +
			", lugar='" + lugar + '\'' +
			'}';
	}
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getLugar() {
        return lugar;
    }
    public void setLugar(String lugar) {
        this.lugar = lugar;
    }
}