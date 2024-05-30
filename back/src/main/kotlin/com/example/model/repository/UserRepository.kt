package com.example.model.repository

import com.example.model.dao.UserDao
import com.example.model.dao.UserDaoImpl
import com.example.model.models.User

class UserRepository {
    private val userDao: UserDao = UserDaoImpl()

    suspend fun addUser(username: String, password: String): User? {
        val user = if (!userDao.isExist(username)) userDao.insert(username, password) else null
        return user
    }

    suspend fun getUserByUsername(username: String): User? =
        userDao.getByUsername(username)

    suspend fun userIsExist(username: String): Boolean =
        userDao.isExist(username)

    suspend fun getUserById(id: Int): User? =
        userDao.getById(id)
}