'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  return (
    <div className='flex items-center gap-3'>
      <Button onClick={decrement} size='icon'>
        <MinusIcon />
      </Button>
      <p>Current vote: ${count}</p>
      <Button onClick={increment} size='icon'>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Counter;
