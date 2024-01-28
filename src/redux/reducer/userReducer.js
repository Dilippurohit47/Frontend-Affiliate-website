import { createSlice } from '@reduxjs/toolkit'


const initialState ={
    user : null,
    loading:true,
}

export const userReducer = createSlice({

    name : "userReducer",
    initialState,
    reducers : {

        userExist:(state , action) =>{
            state.loading = false;
            state.user = action.payload;
            // console.log("logged in")

        },
    userNotExist : (state) =>{
        state.loading =false,
        state.user = null;
        // console.log("not logged in")
    }


    }

})

export const {userExist , userNotExist} = userReducer.actions;