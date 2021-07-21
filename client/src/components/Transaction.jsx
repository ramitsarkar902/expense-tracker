import React from 'react'
import {useGlobalContext} from '../context/globalContext'



const Transaction=({transaction})=>{
    const {deleteTransactions}=useGlobalContext()
    const sign= transaction.amount<0?'-':'+';
    return (
        <li className={transaction.amount<0?'minus':'plus'}>
                 {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span>
                 <button onClick={() => deleteTransactions(transaction._id)} className="delete-btn">x</button>
                </li>
    )
}

export default Transaction
