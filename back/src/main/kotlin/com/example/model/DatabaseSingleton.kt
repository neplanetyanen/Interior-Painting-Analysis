package com.example.model

import com.example.model.models.Histories
import com.example.model.models.Images
import com.example.model.models.Interiors
import com.example.model.models.Users
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseSingleton {
    fun init(jdbcURL: String, driverClassName: String, user: String) {
        val database = Database.connect(
                url = jdbcURL,
                driver = driverClassName,
                user = user,
                password = "1"
            )
        transaction(database) {
            SchemaUtils.create(
                Users,
                Images,
                Histories,
                Interiors
            )
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}