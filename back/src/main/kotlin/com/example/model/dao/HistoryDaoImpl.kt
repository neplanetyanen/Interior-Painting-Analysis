package com.example.model.dao

import com.example.model.DatabaseSingleton.dbQuery
import com.example.model.models.Histories
import com.example.model.models.History
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class HistoryDaoImpl : HistoryDao {
    private fun rowToHistory(row: ResultRow): History = History(
        id = row[Histories.id],
        userId = row[Histories.userId],
        interiorId = row[Histories.interiorId],
        firstImageId = row[Histories.firstImageId],
        secondImageId = row[Histories.secondImageId],
        thirdImageId = row[Histories.thirdImageId],
        fourthImageId = row[Histories.fourthImageId],
        fifthImageId = row[Histories.fifthImageId]
    )

    override suspend fun insert(
        interiorId: Int, userId: Int,
        firstImageId: Int, secondImageId: Int,
        thirdImageId: Int, fourthImageId: Int, fifthImageId: Int
    ): History? = dbQuery {
        val insertStatement = Histories.insert {
            it[this.userId] = userId
            it[this.interiorId] = interiorId
            it[this.firstImageId] = firstImageId
            it[this.secondImageId] = secondImageId
            it[this.thirdImageId] = thirdImageId
            it[this.fourthImageId] = fourthImageId
            it[this.fifthImageId] = fifthImageId
        }

        insertStatement.resultedValues?.singleOrNull()?.run(::rowToHistory)
    }

    override suspend fun getById(id: Int): History? = dbQuery {
        Histories.select { Histories.id eq id }
            .map(::rowToHistory)
            .singleOrNull()
    }

    override suspend fun update(
        id: Int, interiorId: Int,
        firstImageId: Int, secondImageId: Int,
        thirdImageId: Int, fourthImageId: Int, fifthImageId: Int
    ): Boolean = dbQuery {
        Histories.update({ Histories.id eq id }) {
            it[Histories.interiorId] = interiorId
            it[Histories.firstImageId] = firstImageId
            it[Histories.secondImageId] = secondImageId
            it[Histories.thirdImageId] = thirdImageId
            it[Histories.fourthImageId] = fourthImageId
            it[Histories.fifthImageId] = fifthImageId
        } > 0
    }

    override suspend fun getByUserId(userId: Int): List<History> = dbQuery {
        Histories.select { Histories.userId eq userId }
            .map {
                rowToHistory(it)
            }
    }

    override suspend fun delete(id: Int): Boolean = dbQuery {
        Histories.deleteWhere { Histories.id eq id } > 0
    }
}