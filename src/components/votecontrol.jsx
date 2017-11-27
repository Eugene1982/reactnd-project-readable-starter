import React from 'react';
import { VOTE_UP, VOTE_DOWN } from '../utils/constants'

export default function VoteControl({ currentId, onVote }) {
    return (
       <div >
         <button onClick={() => onVote(currentId, VOTE_UP)}>Up</button>
         <button onClick={() => onVote(currentId, VOTE_DOWN)}>Down</button>
       </div>
     )
   }
   