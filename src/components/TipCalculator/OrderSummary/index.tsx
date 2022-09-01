import { HStack } from "@chakra-ui/react";

import SharedStat from "../../shared/SharedStat";

const OrderSummary: React.FC<{}> = () => {
  return (
    <HStack width="full">
      <SharedStat label="Total + Tip" value="$0.00" />
      <SharedStat label="Total" value="$0.00" />
    </HStack>
  );
};

export default OrderSummary;
