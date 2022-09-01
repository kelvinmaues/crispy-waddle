import { useState } from "react";

import SharedNumberInput from "../../shared/SharedNumberInput";

const TipInput = () => {
  const [value, setValue] = useState('1.53')

  const format = (val: string) => `${val}%`
  const parse = (val: string) => val.replace(/^\\%/, '')

  return (
    <SharedNumberInput.FormControl
      label="Tip"
      onChange={(valueString) => setValue(parse(valueString as string))}
      value={format(value)}
    />
  )
};

export default TipInput;
