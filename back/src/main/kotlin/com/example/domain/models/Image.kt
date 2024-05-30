package com.example.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class Image(
    val title: String,
    val artist: String,
    val genre: String,
    val style: String,
    val url: String
)