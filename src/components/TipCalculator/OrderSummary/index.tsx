import React from "react";
import { HStack } from "@chakra-ui/react";

import SharedStat from "../../shared/SharedStat";
import { OrderSummaryProps } from "./types";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalCost,
  totalAndTipCost,
}) => {
  return (
    <HStack width="full">
      <SharedStat label="Total + Tip" value={totalAndTipCost} />
      <SharedStat label="Total" value={totalCost} />
    </HStack>
  );
};

export default React.memo(OrderSummary);
