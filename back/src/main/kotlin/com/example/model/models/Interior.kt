package com.example.model.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Interior(
    val id: Int,
    val interior: String
)

object Interiors : Table() {
    val id = integer("id").autoIncrement()
    val interior = blob("interior")

    override val primaryKey = PrimaryKey(id)
}