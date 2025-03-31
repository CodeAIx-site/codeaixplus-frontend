import { css } from "@emotion/react";
import { Button } from "@chakra-ui/react";

const BtnCustom = ({ children, onClick, isDisabled = false }: any) => {
  return (
    <Button
      onClick={onClick}
      cursor={isDisabled ? "wait" : "pointer"}
      css={BtnCss}
      className="code-action-button"
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default BtnCustom;

export const BtnCss = css`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  background-color: #444444;
  color: #FFFFFF;
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1);
  
  svg,
  .chakra-spinner {
    margin: 0;
    padding: 0;
    width: 16px;
    height: 16px;
    color: #FFFFFF;
  }
  
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  &:hover {
    background-color: #444444;
    transform: translateY(2px);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
    /* Border remains black */
  }
  
  &:focus, &:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
    outline: none;
    border: 2px solid #000000;
  }

  @media (max-width: 768px) {
    padding: 0.35rem 0.7rem;
    gap: 6px;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);

    p {
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    gap: 5px;
    padding: 0.3rem 0.6rem;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
    
    p {
      font-size: 12px;
    }
    
    svg,
    .chakra-spinner {
      width: 14px;
      height: 14px;
    }
  }
`;
