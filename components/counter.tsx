'use client';

import { useState } from 'react';

import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  return (
    <div className='flex items-center gap-3'>
      <Button size='icon' onClick={decrement}>
        <MinusIcon />
      </Button>
      <p>Current vote: ${count}</p>
      <Button size='icon' onClick={increment}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Counter;
