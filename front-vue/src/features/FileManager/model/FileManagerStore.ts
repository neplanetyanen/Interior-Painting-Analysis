import { type _GettersTree, defineStore } from 'pinia';
import { useCreateApi } from '../api/requests';
import { type Paintings, usePaintingsStore } from '@/entities/Paintings';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/consts/localStorage';
import type { User } from '@/entities/User';
import { api } from '@/shared/api';

export const fileManagerNamespace = 'fileManager';

export interface FileManagerSchema {
    user: User | undefined;
    interior: string;
    errorFile?: string;
    errorServer?: string;
    isLoading: boolean;
}

export interface _FileManagerGetterSchema
    extends _GettersTree<FileManagerSchema> {}

export interface FileManagerActionsSchema {
    handleFile: (fileList: FileList | null) => Promise<void>;
    fileToBase64: (file: File) => Promise<string>;
    checkValidFile: (fileList: FileList | null) => void;
}

export const useFileManagerStore = defineStore<
    string,
    FileManagerSchema,
    _FileManagerGetterSchema,
    FileManagerActionsSchema
>(fileManagerNamespace, {
    state: (): FileManagerSchema => ({
        user: undefined,
        interior: '',
        errorServer: undefined,
        errorFile: undefined,
        isLoading: false
    }),
    actions: {
        async handleFile(fileList: FileList | null) {
            this.isLoading = true;
            try {
                await this.checkValidFile(fileList);
                const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
                if (user) {
                    this.user = JSON.parse(user);
                }
                if (this.interior !== '' && this.user) {
                    const createApi = useCreateApi();
                    const response = await api.post(
                        `/users/${this.user.id}/interior`,
                        {
                            bytes: this.interior
                        },
                        { withCredentials: true }
                    );
                    const paintings: Paintings = {
                        interior: response.data.interiorBytes,
                        topPaintings: [
                            response.data.images[0],
                            response.data.images[1],
                            response.data.images[2],
                            response.data.images[3],
                            response.data.images[4]
                        ]
                    };
                    if (response) {
                        const paintingsStore = usePaintingsStore();
                        paintingsStore.setPaintings(paintings, 'create');
                        this.errorFile = undefined;
                    } else {
                        this.errorFile = createApi.error;
                    }
                }
            } catch (error) {
                this.errorFile = 'message.errorFileMsg';
            } finally {
                this.isLoading = false;
            }
        },
        fileToBase64(file: File): Promise<string> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result as string;
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
        async checkValidFile(fileList: FileList | null) {
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                if (/\.(png|jpg|jpeg)$/.test(file.name.toLowerCase())) {
                    this.interior = await this.fileToBase64(file);
                } else {
                    this.errorFile = 'message.errorFormatMsg';
                }
            } else {
                this.errorFile = 'message.errorFileMsg';
            }
        }
    }
});
