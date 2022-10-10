export const saveCredentials = (data) => {
    return {
        type: 'Save_Credentials',
        payload: data,
    }
}

export const loadCredentials = (data) => { 
    return {
        type: 'Load_Credentials',
        payload: data,
    }
}
