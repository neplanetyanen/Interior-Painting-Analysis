package com.example

import com.example.controller.controllers.UserController
import com.example.plugins.*
import com.example.service.JwtService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) = EngineMain.main(args)

fun Application.module() {

    val userController = UserController()
    val jwtService = JwtService(this, userController)

    install(CORS){
        anyHost()
        allowHeaders {
            true
        }
        allowHost("127.0.0.1:5173")
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Post)
        allowCredentials = true
    }
    configureSecurity(jwtService)
    configureDatabase()
    configureContentNegotiation()
    configureRouting(userController, jwtService)
}
