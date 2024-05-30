package com.example.service

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.example.controller.controllers.UserController
import com.example.plugins.request.UserRequest
import io.ktor.server.application.*
import io.ktor.server.auth.jwt.*
import java.util.*

class JwtService(
    private val application: Application,
    private val userController: UserController
) {

    private val secret = getConfigProperty("jwt.secret")
    private val issuer = getConfigProperty("jwt.issuer")
    private val audience = getConfigProperty("jwt.audience")

    val realm = getConfigProperty("jwt.realm")

    val jwtVerifier: JWTVerifier =
        JWT.require(Algorithm.HMAC256(secret))
            .withAudience(audience)
            .withIssuer(issuer)
            .build()

    fun createJwtToken(user: UserRequest): String? {
        return JWT.create()
            .withAudience(audience)
            .withIssuer(issuer)
            .withClaim("username", user.username)
            .withExpiresAt(Date(System.currentTimeMillis() + 3_600_000))
            .sign(Algorithm.HMAC256(secret))

    }

    suspend fun customValidator(credential: JWTCredential): JWTPrincipal? {
        val username = extractUsername(credential)
        val foundUser = username?.let {
            userController.getUserByName(it)
        }

        return foundUser?.let { user ->
            if (audienceMatches(credential)) {
                JWTPrincipal(credential.payload)
            } else null
        }
    }

    private fun audienceMatches(credential: JWTCredential): Boolean =
        credential.payload.audience.contains(audience)

    private fun extractUsername(credential: JWTCredential): String? =
        credential.payload.getClaim("username").asString()

    private fun getConfigProperty(path: String): String =
        application.environment.config.property(path).getString()

}