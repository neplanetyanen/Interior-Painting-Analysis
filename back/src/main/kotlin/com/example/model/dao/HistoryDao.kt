package com.example.model.dao

import com.example.model.models.History

interface HistoryDao {
    suspend fun insert(
        interiorId: Int, userId: Int,
        firstImageId: Int, secondImageId: Int,
        thirdImageId: Int, fourthImageId: Int, fifthImageId: Int
    ): History?

    suspend fun getById(id: Int): History?

    suspend fun update(
        id: Int, interiorId: Int,
        firstImageId: Int, secondImageId: Int,
        thirdImageId: Int, fourthImageId: Int, fifthImageId: Int
    ): Boolean

    suspend fun getByUserId(userId: Int): List<History>

    suspend fun delete(id: Int): Boolean
}