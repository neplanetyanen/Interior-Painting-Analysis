package com.example.plugins

import com.example.controller.controllers.UserController
import com.example.plugins.request.UserRequest
import com.example.plugins.response.UserResponse
import com.example.exceptions.EmptyUserException
import com.example.exceptions.IncorrectPasswordException
import com.example.exceptions.InvalidLengthException
import com.example.exceptions.UserExistException
import com.example.plugins.request.InteriorRequest
import com.example.service.JwtService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(
    userController: UserController,
    jwtService: JwtService
) {
    routing {
        postLoginUserRoute(userController, jwtService)
        postSignupUserRoute(userController)
        postLogoutRoute()
        refreshTokenRoute(jwtService)
        putInterior(userController)
        getHistory(userController)
        
    }
}

fun Route.postLoginUserRoute(userController: UserController, jwtService: JwtService) {
    route("/auth/login") {
        post {
            val user: UserRequest = call.receive<UserRequest>()

            try {
                val respond: UserResponse = userController.getUser(user.username, user.password)

                val token = jwtService.createJwtToken(user)
                token?.let {
                    respond.token = it
                }

                call.respond(HttpStatusCode.OK, respond)
            } catch (e: Throwable) {
                when (e) {
                    is InvalidLengthException -> call.respond(HttpStatusCode.BadRequest, mapOf("message" to "INVALID_LENGTH"))
                    is EmptyUserException -> call.respond(HttpStatusCode.NotFound, mapOf("message" to "USERNAME_NOT_FOUND"))
                    is IncorrectPasswordException -> call.respond(HttpStatusCode.Conflict, mapOf("message" to "INCORRECT_PASSWORD"))
                }
            }
        }
    }
}

fun Route.postSignupUserRoute(userController: UserController) {
    route("/auth/signup") {
        post {
            val user: UserRequest = call.receive<UserRequest>()

            try{
                val newUser = userController.addUser(user.username, user.password)
                call.respond(newUser)
            } catch (e: InvalidLengthException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("message" to "INVALID_LENGTH"))
            } catch (e: UserExistException) {
                call.respond(HttpStatusCode.Conflict, mapOf("message" to "USERNAME_ALREADY_EXISTS"))
            }
        }
    }
}

fun Route.postLogoutRoute() {
    route("auth/logout") {
        post {

        }
    }
}

fun Route.refreshTokenRoute(jwtService: JwtService) {
    route("/auth/refresh") {
        post {
            val loginRequest = call.receive<UserRequest>()
            val token = jwtService.createJwtToken(loginRequest)
            token?.let {
                call.respond(hashMapOf("token" to it))
            } ?: call.respond(HttpStatusCode.Unauthorized)
        }
    }
}

fun Route.putInterior(userController: UserController) {
    route("/users/{id}/interior") {
        authenticate {
            post {
                val id = call.parameters["id"]?.toInt()
                val interiorRequest = call.receive<InteriorRequest>()
                try {
                    val interiorResponse =
                        userController.addRequestInHistory(requireNotNull(id), interiorRequest.bytes)
                    call.respond(interiorResponse)
                } catch (e: UserExistException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }
        }
    }
}

fun Route.getHistory(userController: UserController){
    route("/users/{id}/history") {
        authenticate {
            get {
                val id = call.parameters["id"]?.toInt()
                val historyResponse = userController.getUserHistory(requireNotNull(id))
                call.respond(historyResponse)
            }
        }
    }
}
