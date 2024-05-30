package com.example.model.dao

import com.example.model.models.User

interface UserDao {
    suspend fun insert(username: String, password: String): User?

    suspend fun isExist(username: String): Boolean

    suspend fun getAll(): List<User>

    suspend fun getById(id: Int): User?

    suspend fun getByUsername(username: String): User?

    suspend fun update(id: Int, username: String, password: String, historyId: Int): Boolean

    suspend fun delete(id: Int): Boolean
}