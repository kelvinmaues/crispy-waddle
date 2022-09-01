import React from "react";
import { Box, Button, Heading, HStack, List, ListItem } from "@chakra-ui/react";

import { formatCurrency } from "../../../utils/formatCurrency";
import { FoodItem } from "../types";
import { FoodListProps } from "./types";

const FoodList: React.FC<FoodListProps> = ({
  foodList,
  onRemove,
  onUpdate,
}) => {
  const foodLabel = ({ amount, name, cost }: FoodItem) =>
    `- ${amount}x ${name} @ ${formatCurrency(parseFloat(cost))}`;

  return (
    <Box>
      <Heading as="h5" size="md">
        Order List
      </Heading>
      <Box
        borderColor="blackAlpha.500"
        borderWidth={2}
        borderRadius="md"
        py={4}
        px={4}
        height="300px"
        overflow="scroll"
      >
        <List spacing={3}>
          {
            foodList.map((food, index) => (
              <ListItem
                key={`${index}-${food.name}`}
                display="flex"
                justifyContent="space-between"
                fontWeight="bold"
                width="full"
              >
                {foodLabel(food)}
                <HStack ml={4} spacing={2}>
                  <Button
                    size="xs"
                    colorScheme="red"
                    onClick={() => onRemove?.(index)}
                  >
                    Remove
                  </Button>
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={() => onUpdate?.(index)}
                  >
                    Edit
                  </Button>
                </HStack>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Box>
  );
};

export default React.memo(FoodList);
