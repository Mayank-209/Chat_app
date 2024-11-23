import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages';

function Messages() {
  useGetMessages();
  return (
    <div className='px-4 flex-1 overflow-auto'>
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/>
      <SingleMessage/>
    </div>
  )
}

export default Messages
