import React, { useState, useContext, useReducer, useEffect } from 'react'

import reducer from './reducer'
import axios from 'axios'

const AppContext = React.createContext()

const initialState={
  transactions:[], 
  error:null,
  loading:true
}




const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  
async function getTransactions() {
  try {
    const res = await axios.get('/api/v1/transactions');

    dispatch({
      type: 'GET_TRANSACTIONS',
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error
    });
  }
}

 async function deleteTransactions(id){
   try{
     await axios.delete(`/api/v1/transactions/${id}`);
     dispatch({type:'DELETE_TRANSACTION',payload:id})
   }catch(err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error
    });
  
   }
   
 }

 async function addTransaction(transaction) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/v1/transactions', transaction, config);

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error
    });
  }
}

  return (
    <AppContext.Provider
      value={{
        transactions:state.transactions,
        error:state.error,
        loading:state.loading,
        getTransactions,
        deleteTransactions,
        addTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }