import {createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import axios from "axios";



export const userApi = createApi({
    reducerPath:"userAPi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`
    }),

    endpoints:(builder) =>({
        login:builder.mutation({
            query:(user) =>({
                url:"new",
                method:"POST",
                body:user,

            })
        }),


        AddToCart :builder.mutation({
            query:({userId,productId}) =>({
              url:`/cart/${userId}/${productId}`,
              method:"POST"
            })
          })

    })

}) 

export const getUser= async (id) =>{

    try {
        const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)

        return data;
    } catch (error) {
        throw error;
        
    }

}



export const  {useLoginMutation , useAddToCartMutation} = userApi
