import { buildApi } from '@/shared/api/lib/useApi';

export const historyNamespace = 'create';

export const useHistoryApi = buildApi<any, void>(historyNamespace, {
    url: '/auth/history',
    method: 'POST',
    withCredentials: true
});
