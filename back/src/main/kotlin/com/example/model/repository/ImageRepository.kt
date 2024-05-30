package com.example.model.repository

import com.example.model.dao.ImageDao
import com.example.model.dao.ImageDaoImpl
import com.example.domain.models.Image
import com.example.model.models.ImageEntity

class ImageRepository {
    private val imageDao: ImageDao = ImageDaoImpl()

    suspend fun addImage(image: Image): ImageEntity? {
        if (!imageDao.isExist(artist = image.artist, title = image.title))
            return imageDao.insert(
                artist = image.artist,
                genre = image.genre,
                style = image.style,
                title = image.title,
                url = image.url
            )
        else return imageDao.getByTitleAndArtist(image.title, image.artist)

    }

    suspend fun getById(id: Int): ImageEntity? =
        imageDao.getById(id)

    suspend fun getAllImages() = imageDao.getAll()
}