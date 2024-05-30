package com.example.model.repository

import com.example.model.dao.InteriorDao
import com.example.model.dao.InteriorDaoImpl
import com.example.model.models.Interior

class InteriorRepository {
    private val interiorDao: InteriorDao = InteriorDaoImpl()

    suspend fun addInterior(interior: String): Interior =
        requireNotNull(interiorDao.insert(interior))

    suspend fun getInterById(id: Int): Interior = requireNotNull(interiorDao.getById(id))

    suspend fun deleteInterior(id: Int) = interiorDao.delete(id)
}