package com.example.model.dao

import com.example.model.DatabaseSingleton.dbQuery
import com.example.model.models.Interior
import com.example.model.models.Interiors
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.statements.api.ExposedBlob

class InteriorDaoImpl : InteriorDao {
    private fun rowToInterior(row: ResultRow): Interior = Interior(
        id = row[Interiors.id],
        interior = row[Interiors.interior].bytes.decodeToString()
    )

    override suspend fun insert(interior: String): Interior? = dbQuery {
        Interiors.insert {
            it[this.interior] = ExposedBlob(interior.toByteArray())
        }.resultedValues?.singleOrNull()?.run(::rowToInterior)
    }

    override suspend fun getById(id: Int): Interior? = dbQuery {
        Interiors.select { Interiors.id eq id }
            .map(::rowToInterior)
            .singleOrNull()
    }

    override suspend fun delete(id: Int): Boolean = dbQuery {
        Interiors.deleteWhere { Interiors.id eq id } > 0
    }
}