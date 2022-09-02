import SharedNumberInput from "../../shared/SharedNumberInput";
import { TipInputProps } from "./types";

const TipInput: React.FC<TipInputProps> = ({
  value,
  onChange,
}) => {
  const format = (val: string) => `${val}%`
  const parse = (val: string) => val.replace(/^\\%/, '')

  return (
    <SharedNumberInput.FormControl
      name="Tip"
      label="Tip"
      precision={2}
      step={0.2}
      onChange={(valueString) => onChange(parse(valueString as string))}
      value={format(value)}
    />
  )
};

export default TipInput;
