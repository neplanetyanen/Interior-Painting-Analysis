package com.example.model.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class ImageEntity(
    val id: Int,
    val title: String,
    val artist: String,
    val genre: String,
    val style: String,
    val url: String
)

object Images : Table() {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 128)
    val artist = varchar("artist", 64)
    val genre = varchar("genre", 64)
    val style = varchar("style", 32)
    val url = varchar("url", 256)

    override val primaryKey = PrimaryKey(id)
}