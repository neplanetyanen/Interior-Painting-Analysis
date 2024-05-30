package com.example.plugins.response

import com.example.domain.models.History
import kotlinx.serialization.Serializable

@Serializable
data class HistoryResponse(
    val history: MutableList<History>
)