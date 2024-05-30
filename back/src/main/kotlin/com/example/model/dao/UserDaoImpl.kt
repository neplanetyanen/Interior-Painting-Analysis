package com.example.model.dao

import com.example.model.DatabaseSingleton.dbQuery
import com.example.model.models.User
import com.example.model.models.Users
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class UserDaoImpl : UserDao {
    private fun rowToUser(row: ResultRow): User = User(
        id = row[Users.id],
        username = row[Users.username],
        password = row[Users.password],
    )

    override suspend fun insert(username: String, password: String): User? = dbQuery {
        val insertStatement = Users.insertIgnore {
            it[this.username] = username
            it[this.password] = password
        }
        insertStatement.resultedValues?.singleOrNull()?.run(::rowToUser)
    }

    override suspend fun isExist(username: String): Boolean = dbQuery {
        !Users.select { Users.username eq username }.empty()
    }

    override suspend fun getAll(): List<User> = dbQuery {
        Users.selectAll().map(::rowToUser)
    }

    override suspend fun getById(id: Int): User? = dbQuery {
        Users.select { Users.id eq id }
            .map(::rowToUser)
            .singleOrNull()
    }

    override suspend fun getByUsername(username: String): User? = dbQuery {
        Users.select {
            Users.username eq username
        }
            .map(::rowToUser)
            .singleOrNull()
    }

    override suspend fun update(
        id: Int, username: String,
        password: String, historyId: Int
    ): Boolean = dbQuery {
        Users.update({ Users.id eq id }) {
            it[Users.username] = username
            it[Users.password] = password
        } > 0
    }

    override suspend fun delete(id: Int): Boolean = dbQuery {
        Users.deleteWhere { Users.id eq id } > 0
    }
}