package com.example.plugins.response

import kotlinx.serialization.Serializable

@Serializable
data class UserResponse(
    val id: Int,
    val username: String,
    var token: String = ""
)