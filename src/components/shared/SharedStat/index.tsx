import {
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { SharedStatProps } from "./types";

const SharedStat: React.FC<SharedStatProps> = ({
  label,
  value,
  ...props
}) => {
  return (
    <Stat {...props}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  );
};

export default SharedStat;
