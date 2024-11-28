import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const LoadingSpinner: React.FC = () => (
  <Flex justifyContent="center" alignItems="center" height="100%">
    <Spinner size="lg" />
  </Flex>
);

export default LoadingSpinner;
