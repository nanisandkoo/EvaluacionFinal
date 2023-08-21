package com.example.demo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.example.demo.Entidades.VentaDetalle;

@RepositoryRestResource(collectionResourceRel = "ventadetalles", path = "ventadetalles")
public interface VentaDetalleRepository extends CrudRepository<VentaDetalle, Long>  {
}