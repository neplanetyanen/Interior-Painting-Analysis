package com.example.model.repository

import com.example.model.dao.HistoryDao
import com.example.model.dao.HistoryDaoImpl
import com.example.model.models.History

class HistoryRepository {
    private val historyDao: HistoryDao = HistoryDaoImpl()

    suspend fun add(interiorId: Int, userId: Int, imagesIds: List<Int>) {
        historyDao.insert(
            interiorId,
            userId,
            imagesIds[0],
            imagesIds[1],
            imagesIds[2],
            imagesIds[3],
            imagesIds[4]
        )
    }

    suspend fun getById(id: Int): History? = historyDao.getById(id)

    suspend fun getHistoryByUserId(id: Int): List<History> = historyDao.getByUserId(id)
}