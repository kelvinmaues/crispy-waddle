import React from "react";
import { Box, Button, Center, HStack, List, ListItem, Text } from "@chakra-ui/react";

import { formatCurrency } from "../../../utils/formatCurrency";
import { FoodItem } from "../types";
import { FoodListProps } from "./types";

const FoodList: React.FC<FoodListProps> = ({
  foodList,
  onRemove,
  onEdit,
}) => {
  const foodLabel = ({ amount, name, cost }: FoodItem) =>
    `- ${amount}x ${name} @ ${formatCurrency(parseFloat(cost))}`;

  return (
    <Box
      borderColor="blackAlpha.500"
      borderWidth={2}
      borderRadius="md"
      py={4}
      px={4}
      height="300px"
      overflow="scroll"
    >
      {
        foodList.length > 0 ? (
          <List spacing={3} aria-labelledby="foods-heading">
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
                      onClick={() => onEdit?.(index)}
                    >
                      Edit
                    </Button>
                  </HStack>
                </ListItem>
              ))
            }
          </List>
        )
        : (
          <Center h="full">
            <Text fontSize='xl'>There is not items added.</Text>
          </Center>
        )
      }
    </Box>
  );
};

export default React.memo(FoodList);
