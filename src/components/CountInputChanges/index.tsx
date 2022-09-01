import React, { useState, useEffect } from "react";

const CountInputChanges = () => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);
  
  useEffect(() => {
    return () => {
      setCount(count + 1);
    }
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <p>Cantidad de cambios: {count}</p>
    </div>
  );
};

export default CountInputChanges;
