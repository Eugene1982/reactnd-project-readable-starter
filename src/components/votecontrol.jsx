import React from 'react';
import { VOTE_UP, VOTE_DOWN } from '../utils/constants'
import ArrowUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ArrowDownIcon from 'react-icons/lib/fa/thumbs-o-down'


export default function VoteControl({ currentId, onVote }) {
    return (
       <div >
         <button className='icon-btn' onClick={() => onVote(currentId, VOTE_UP)}><ArrowUpIcon size={10}/></button>
         <button className='icon-btn' onClick={() => onVote(currentId, VOTE_DOWN)}><ArrowDownIcon size={10}/></button>
       </div>
     )
   }
   