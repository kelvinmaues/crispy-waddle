import React from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";

import { formatCurrency } from "../../../utils/formatCurrency";
import { FoodItem } from "../types";
import { FoodListProps } from "./types";

const FoodList: React.FC<FoodListProps> = ({ foodList }) => {

  const foodLabel = ({ amount, name, cost }: FoodItem) => (
    `- ${amount}x ${name} @ $${formatCurrency(cost)}`
  );

  return (
    <Box
      borderColor="blackAlpha.500"
      borderWidth={2}
      borderRadius="md"
      p={2}
      height="300px"
      overflow="scroll"
    >
      <Heading as="h5" size="md" mb={4} textDecoration="underline">
        Order List
      </Heading>

      <List spacing={3}>
        {
          foodList.map((food, index) => (
            <ListItem key={`${index}-${food.name}`} fontWeight="bold">
              {foodLabel(food)}
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
};

export default React.memo(FoodList);
