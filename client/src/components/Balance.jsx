import React from 'react'
import {useGlobalContext} from '../context/globalContext'
import { numberWithCommas } from '../utils/util'

 const Balance=()=>{
     const{transactions}=useGlobalContext()

     const amounts = transactions.map(transaction => transaction.amount);

     const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </>
    )
}

export default Balance


