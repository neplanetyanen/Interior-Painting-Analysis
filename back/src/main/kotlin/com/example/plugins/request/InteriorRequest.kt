package com.example.plugins.request

import kotlinx.serialization.Serializable

@Serializable
data class InteriorRequest(
    val bytes: String
)