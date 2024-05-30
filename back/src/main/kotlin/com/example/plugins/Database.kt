package com.example.plugins

import com.example.model.DatabaseSingleton
import io.ktor.server.application.*

fun Application.configureDatabase() {
    DatabaseSingleton.init(
        jdbcURL = environment.config.property("database.jdbcURL").getString(),
        driverClassName = environment.config.property("database.driverClassName").getString(),
        user = environment.config.property("database.user").getString()
    )
}