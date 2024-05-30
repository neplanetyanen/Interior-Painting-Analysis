package com.example.controller.controllers

import com.example.domain.models.History
import com.example.exceptions.EmptyUserException
import com.example.exceptions.IncorrectPasswordException
import com.example.exceptions.InvalidLengthException
import com.example.exceptions.UserExistException
import com.example.model.mapper.toImage
import com.example.model.models.ImageEntity
import com.example.model.models.User
import com.example.model.repository.HistoryRepository
import com.example.model.repository.InteriorRepository
import com.example.model.repository.UserRepository
import com.example.plugins.response.HistoryResponse
import com.example.plugins.response.InteriorResponse
import com.example.plugins.response.UserResponse
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlin.io.path.outputStream
import kotlin.io.path.pathString

class UserController {
    private val userRepository: UserRepository = UserRepository()
    private val historyRepository: HistoryRepository = HistoryRepository()
    private val imageController: ImageController = ImageController()
    private val interiorRepository: InteriorRepository = InteriorRepository()

    private fun isValidUser(username: String, password: String): Boolean {
        if (username.length !in MIN_USERNAME_LENGTH..MAX_USERNAME_LENGTH ||
            password.length < MIN_PASSWORD_LENGTH
        ) {
            return false
        } else
            return true
    }

    suspend fun addUser(username: String, password: String): UserResponse {
        if (!isValidUser(username, password))
            throw InvalidLengthException()

        if (userRepository.userIsExist(username))
            throw UserExistException()

        val user: User = requireNotNull(userRepository.addUser(username, password))

        return UserResponse(
            user.id,
            user.username,
        )
    }

    suspend fun getUser(username: String, password: String): UserResponse {
        if (!isValidUser(username, password))
            throw InvalidLengthException()

        val user =
            userRepository.getUserByUsername(username) ?: throw EmptyUserException()

        if (user.password != password)
            throw IncorrectPasswordException()

        return UserResponse(
            id = user.id,
            username = user.username,
        )
    }

    suspend fun getUserByName(username: String): UserResponse? {
        val user = userRepository.getUserByUsername(username)
        return if (user != null) UserResponse(id = user.id, username = user.username) else null
    }

    suspend fun addRequestInHistory(id: Int, interior: String): InteriorResponse {
        if (userRepository.getUserById(id) == null) throw UserExistException()

        withContext(Dispatchers.IO) {
                val tempFile = kotlin.io.path.createTempFile()
                tempFile.outputStream().bufferedWriter().use {
                    it.write(interior.split(",")[1])
                }
                val process = Runtime.getRuntime().exec(
                    arrayOf(
                        "python",
                        "C:\\Users\\user\\Documents\\baum\\it\\test\\ipa.io\\analytics\\model\\similarity.py",
                        tempFile.pathString
                    )
                )
                process.waitFor()
        }

        val images =
            imageController.refresh("C:\\Users\\user\\Documents\\baum\\it\\test\\ipa.io\\analytics\\model\\selected_paintings.json")

        val inter = interiorRepository.addInterior(interior)

        historyRepository.add(inter.id, id, images.map { it.id })

        return InteriorResponse(
            interiorBytes = interior,
            images.map(ImageEntity::toImage)
        )
    }

    suspend fun getUserHistory(id: Int): HistoryResponse {
        val response = HistoryResponse(mutableListOf())
        val history = historyRepository.getHistoryByUserId(id)

        history.forEach { record ->
            val interior = interiorRepository.getInterById(record.interiorId).interior

            val firstImage = imageController.getById(record.firstImageId)
            val secondImage = imageController.getById(record.secondImageId)
            val thirdImage = imageController.getById(record.thirdImageId)
            val fourthImage = imageController.getById(record.fourthImageId)
            val fifthImage = imageController.getById(record.fifthImageId)

            val newRecord = History(
                interior, firstImage,
                secondImage, thirdImage,
                fourthImage, fifthImage
            )

            response.history.add(newRecord)
        }

        return response
    }

    companion object {
        const val MIN_USERNAME_LENGTH = 5
        const val MAX_USERNAME_LENGTH = 30
        const val MIN_PASSWORD_LENGTH = 8
    }
}