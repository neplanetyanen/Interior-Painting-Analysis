package com.example.model.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class User(
    val id: Int,
    val username: String,
    val password: String,
)

object Users : Table() {
    val id = integer("id").autoIncrement()
    val username = varchar("username", 128)
    val password = varchar("password", 128)

    override val primaryKey = PrimaryKey(id)
}