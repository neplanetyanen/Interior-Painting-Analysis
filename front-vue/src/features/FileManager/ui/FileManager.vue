<script setup lang="ts">
import { Column, Typography } from '@/shared/ui';
import Images from '@/shared/assets/icons/Images.vue';
import { ref } from 'vue';
import { useFileManagerStore } from '../model/FileManagerStore';
import Loader from '@/shared/assets/figures/LoaderRed.vue';

const fileManagerStore = useFileManagerStore();

const isDraggingOver = ref(false);

const openFileManager = async () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/png, image/jpeg, image/jpg';
    inputElement.click();

    inputElement.addEventListener('change', async () => {
        const files = inputElement.files;
        await fileManagerStore.handleFile(files);
    });
};

const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    isDraggingOver.value = true;
};

const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    isDraggingOver.value = false;
};

const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    isDraggingOver.value = false;

    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
        const files = dataTransfer.files;
        await fileManagerStore.handleFile(files);
    } else {
        fileManagerStore.errorFile = 'message.errorFileMsg';
    }
};
</script>
<template>
    <Column
        :class="{ 'file-manager': true, 'drag-over': isDraggingOver }"
        :gap="'32'"
        :justify="
            isDraggingOver || fileManagerStore.isLoading ? 'center' : 'start'
        "
        @dragenter="handleDragEnter"
        @dragover.prevent
        @dragleave="handleDragLeave"
        @drop="handleDrop"
    >
        <template v-if="!isDraggingOver && !fileManagerStore.isLoading">
            <Images />
            <Typography :as="'span'">
                {{ $t('message.instructionFileManagerStart') }}
                <Typography
                    :as="'span'"
                    class="link-file-manager"
                    @click="openFileManager"
                >
                    {{ $t('message.instructionLinkFileManager') }}
                </Typography>
                <Typography
                    :as="'span'"
                    v-html="$t('message.instructionFileManagerEnd')"
                ></Typography>
            </Typography>
            <template v-if="fileManagerStore.errorFile">
                <Typography :weight="700" :color="'error-msg'" :size="'xs'">
                    {{ $t(fileManagerStore.errorFile) }}
                </Typography>
            </template>
        </template>
        <template v-if="isDraggingOver">
            <Typography
                :size="'m'"
                :weight="700"
                :color="'light'"
                class="text-drag-over"
            >
                {{ $t('message.dragAndDropMsg') }}
            </Typography>
        </template>
        <template v-if="fileManagerStore.isLoading">
            <Loader class="loader" />
        </template>
    </Column>
</template>
<style lang="css" scoped>
@import url('./FileManager.css');
</style>
