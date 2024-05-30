package com.example.plugins.response

import com.example.domain.models.Image
import kotlinx.serialization.Serializable

@Serializable
data class InteriorResponse(
    val interiorBytes: String,
    val images: List<Image>
)