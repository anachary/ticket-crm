import React from 'react'
import PropTypes from 'prop-types'
import './message-history.style.css'

export const MessageHistory = ({msg, disabled}) => {
  if (!msg)
   return null;
  return msg.map((row,i) =>(
    <div key ={i} className={'message-history mt-3'} >
        <div className={'send font-weight-bold text-secondary m-2'}>
            <div className={'sender'}>
               {row.sender}
            </div>
            <div className={'date'}>
                {(new Date(row.msgAt)).toLocaleDateString('en-US') +" "+ (new Date(row.msgAt)).toLocaleTimeString('en-US')}
            </div>
        </div>
        <div className= {disabled ?'message disabled' :'message'}>{row.message}</div>
    </div>)
  )
}

MessageHistory.protoTypes={
    msg:PropTypes.array.isRequired
}