const initialState = {
    customername: '',
    token: '',
    username: '',
}

const saveCredentialsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case "Save_Credentials" : sessionStorage.setItem('currentUser', JSON.stringify(action.payload)); 
        return {...state, customername: action.payload.customerName, token: action.payload.token, username: action.payload.username };

        case "Load_Credentials" : return {...state, customername: action.payload.customerName, token: action.payload.token, username: action.payload.username };

        
        default : return state
    }
}

export default saveCredentialsReducer;