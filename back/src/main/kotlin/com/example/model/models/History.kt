package com.example.model.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class History(
    val id: Int,
    val userId: Int,
    val interiorId: Int,
    val firstImageId: Int,
    val secondImageId: Int,
    val thirdImageId: Int,
    val fourthImageId: Int,
    val fifthImageId: Int
)

object Histories : Table() {
    val id = integer("id").autoIncrement()
    val userId = integer("user_id")
    val interiorId = integer("ID_interior")
    val firstImageId = integer("ID_first_image")
    val secondImageId = integer("ID_second_image")
    val thirdImageId = integer("ID_third_image")
    val fourthImageId = integer("ID_fourth_image")
    val fifthImageId = integer("ID_fifth_image")

    override val primaryKey = PrimaryKey(id)
}