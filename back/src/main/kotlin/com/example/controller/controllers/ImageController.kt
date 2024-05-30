package com.example.controller.controllers

import com.example.domain.models.Image
import com.example.model.mapper.toImage
import com.example.model.models.ImageEntity
import com.example.model.repository.ImageRepository
import kotlinx.serialization.json.Json
import java.io.File

class ImageController {
    private val imageRepository = ImageRepository()

    suspend fun refresh(jsonFilepath: String): List<ImageEntity> {
        val jsonString = File(jsonFilepath).readText(Charsets.UTF_8)
        val jsonData: List<Image> = Json.decodeFromString(jsonString)
        val returnImages = mutableListOf<ImageEntity>()

        jsonData.forEach { image ->
            returnImages.add(requireNotNull(imageRepository.addImage(image)))
        }

        return returnImages
    }

    suspend fun getById(id: Int): Image =
        requireNotNull(imageRepository.getById(id)?.toImage())
}