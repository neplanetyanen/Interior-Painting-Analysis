package com.example.model.dao

import com.example.model.models.Interior

interface InteriorDao {
    suspend fun insert(interior: String): Interior?

    suspend fun getById(id: Int): Interior?

    suspend fun delete(id: Int): Boolean
}