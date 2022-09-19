package com.rmc.pejo.service;

import java.util.List;

public interface CRUDService<T> {
    T save(T t);
    List<T> getAll();
    T update(T t);
    void delete(Long id);
}
