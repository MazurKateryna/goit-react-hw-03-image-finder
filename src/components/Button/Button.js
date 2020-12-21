import React from 'react';
import './Button.css'

export default function Button ({ onButtonLoad }) {
  return (
    <button type='button' className='Button' onClick={onButtonLoad}>Load more</button>
  )
}