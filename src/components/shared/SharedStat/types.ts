import { StatProps } from "@chakra-ui/react";

export type SharedStatProps = StatProps & {
  label: string;
  value: string | number;
};
