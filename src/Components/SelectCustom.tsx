import React from "react";
import { Select, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)`
  background-color: #444444;
  color: #FFFFFF;
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  height: 38px;
  min-width: 12rem;
  max-width: 14rem;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1);
  transition: all 0.2s ease;

  &:hover {
    /* Keep black border */
    border: 2px solid #000000;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
    transform: translateY(2px);
  }

  &:focus {
    border: 2px solid #000000 !important; /* Keep black border on focus */
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1) !important;
    transform: translateY(2px);
    outline: none !important;
  }

  &:active {
    border: 2px solid #000000 !important;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1) !important;
    outline: none !important;
  }

  option {
    background-color: #444444;
    color: #FFFFFF;
  }

  @media (max-width: 768px) {
    min-width: 10rem;
    font-size: 0.75rem;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  }

  @media (max-width: 480px) {
    min-width: 8rem;
    font-size: 0.7rem;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
`;

const SelectCustom = ({ leftImage, array, value, onChange, keyName }: any) => {
  return (
    <Box position="relative" display="flex" alignItems="center">
      {leftImage && (
        <Box 
          position="absolute" 
          left="10px" 
          zIndex="1"
          pointerEvents="none"
          color="white"
          fontSize="16px"
        >
          {leftImage}
        </Box>
      )}
      <StyledSelect 
        value={value} 
        onChange={onChange}
        paddingLeft={leftImage ? "32px" : ""}
      >
        {array.map((item: any, index: number) => (
          <option key={index} value={item[keyName]}>
            {item[keyName]}
          </option>
        ))}
      </StyledSelect>
    </Box>
  );
};

export default SelectCustom;
