import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="calc(100vh - 100px)"
      position="relative"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
      width="89vw"
    >
      <Flex bg={`${color}.600}`} align="end">
        <Box margin="20px">
          <Box padding="20px">
            <Image
              boxSize="160px"
              boxShadow="2xl"
              src={image}
              borderRadius={roundImage ? "100%" : "3px"}
            />
          </Box>
        </Box>
        <Box margin="20px">
          <Box padding="20px" lineHeight="40px" color="white">
            <Text fontSize="sm" fontWeight="bold" casing="uppercase">
              {subtitle}
            </Text>
            <Text fontSize="6xl">{title}</Text>
            <Text fontSize="sm" fontWeight="100">
              {description}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box margin="20px">
        <Box paddingY="50px">{children}</Box>
      </Box>
    </Box>
  );
};



export default GradientLayout;
