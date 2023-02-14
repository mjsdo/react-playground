import type { ChangeEventHandler } from 'react';

import React, { useState } from 'react';

const Input = () => {
  const [value, setValue] = useState('Yarn berry zero install + Vite + Vitest');
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  return <input value={value} onChange={onChange} />;
};

export default Input;
