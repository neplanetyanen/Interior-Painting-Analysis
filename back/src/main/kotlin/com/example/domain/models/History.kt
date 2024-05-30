package com.example.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class History(
    val interiorId: String,
    val firstImageId: Image,
    val secondImageId: Image,
    val thirdImageId: Image,
    val fourthImageId: Image,
    val fifthImageId: Image
)