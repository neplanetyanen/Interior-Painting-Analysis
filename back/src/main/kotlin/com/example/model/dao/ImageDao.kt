package com.example.model.dao

import com.example.model.models.ImageEntity

interface ImageDao {
    suspend fun insert(
        title: String, artist: String,
        genre: String, style: String, url: String
    ): ImageEntity?

    suspend fun isExist(title: String, artist: String): Boolean

    suspend fun getAll(): List<ImageEntity>

    suspend fun getById(id: Int): ImageEntity?

    suspend fun getByTitleAndArtist(title: String, artist: String): ImageEntity?

    suspend fun update(
        id: Int, title: String, artist: String,
        genre: String, style: String, url: String
    ): Boolean

    suspend fun delete(id: Int): Boolean
}