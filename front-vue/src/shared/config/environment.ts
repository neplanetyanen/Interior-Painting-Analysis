export const getEnvironmentVariable = (key: string): string => {
    const environmentVariable = import.meta.env[key];
    if (environmentVariable === undefined) {
        throw new Error(`Environment variable ${key} is required`);
    }
    return environmentVariable;
};

export const __BASE_URL__ = getEnvironmentVariable('VITE_BASE_URL');
// export const __SOCKET_URL__ = getEnvironmentVariable('VITE_SOCKET_URL');
// export const __IS_DEV__  = getEnvironmentVariable('DEV');
// export const __IS_PROD__  = getEnvironmentVariable('PROD');
