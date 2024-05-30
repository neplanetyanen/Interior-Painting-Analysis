package com.example.model.mapper

import com.example.domain.models.Image
import com.example.model.models.ImageEntity

fun ImageEntity.toImage() : Image =
    Image(
        title = title,
        artist = artist,
        genre = genre,
        style = style,
        url = url
    )