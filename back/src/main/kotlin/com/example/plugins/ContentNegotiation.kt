package com.example.plugins

import io.ktor.http.*
import io.ktor.serialization.kotlinx.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json

fun Application.configureContentNegotiation() {
    install(ContentNegotiation) {
        val converter = KotlinxSerializationConverter(
            Json {
                prettyPrint = true
                isLenient = true
            }
        )
        register(ContentType.Application.Json, converter)
    }
}