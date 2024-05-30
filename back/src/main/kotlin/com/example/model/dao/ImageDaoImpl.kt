package com.example.model.dao

import com.example.model.DatabaseSingleton.dbQuery
import com.example.model.models.ImageEntity
import com.example.model.models.Images
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class ImageDaoImpl : ImageDao {
    private fun rowToImage(row: ResultRow): ImageEntity = ImageEntity(
        id = row[Images.id],
        title = row[Images.title],
        artist = row[Images.artist],
        genre = row[Images.genre],
        style = row[Images.style],
        url = row[Images.url]
    )

    override suspend fun insert(
        title: String, artist: String,
        genre: String, style: String, url: String
    ): ImageEntity? = dbQuery {
        val insertStatement = Images.insert {
            it[this.title] = title
            it[this.artist] = artist
            it[this.genre] = genre
            it[this.style] = style
            it[this.url] = url
        }

        insertStatement.resultedValues?.singleOrNull()?.run(::rowToImage)
    }

    override suspend fun isExist(title: String, artist: String): Boolean = dbQuery {
        !Images.select {
            (Images.title eq title)
                .and(Images.artist eq artist)
        }.empty()
    }

    override suspend fun getAll(): List<ImageEntity> = dbQuery {
        Images.selectAll().map(::rowToImage)
    }

    override suspend fun getById(id: Int): ImageEntity? = dbQuery {
        Images.select { Images.id eq id }
            .map(::rowToImage)
            .singleOrNull()
    }

    override suspend fun getByTitleAndArtist(title: String, artist: String): ImageEntity? = dbQuery {
        Images.select {
            (Images.title eq title)
                .and(Images.artist eq artist)
        }.map(::rowToImage).singleOrNull()
    }

    override suspend fun update(
        id: Int,
        title: String,
        artist: String,
        genre: String,
        style: String,
        url: String
    ): Boolean = dbQuery {
        Images.update({Images.id eq id}) {
            it[Images.title] =  title
            it[Images.artist] = artist
            it[Images.genre] = genre
            it[Images.style] = style
            it[Images.url] = url
        } > 0
    }

    override suspend fun delete(id: Int): Boolean = dbQuery {
        Images.deleteWhere { Images.id eq id } > 0
    }
}