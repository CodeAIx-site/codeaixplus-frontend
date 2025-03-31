import { css } from "@emotion/react";

export const Outer = css`
  margin: auto;
  width: 97.5%;
  margin-top: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80vh;
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  @media (max-width: 768px) {
    height: 140vh;
  }
  @media (max-width: 480px) {
    height: 170vh;
  }
`;
// Update the InputBtnsContainer style

export const InputBtnsContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 15px 20px;
  gap: 15px;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Add this class to style code action buttons as a group */
  .code-actions-group {
    display: flex;
    gap: 12px;
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 12px 15px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    padding: 10px;
    justify-content: center;
    
    .code-actions-group {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;
export const BothEditorContainers = css`
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;

  .left-block,
  .right-block {
    min-width: 300px;
    height: 100%;
  }
  .splitter {
    cursor: col-resize;
    height: 100%;
    width: 7.5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .left-block,
    .right-block {
      min-width: 100%;
      min-height: 500px;
    }
    .splitter {
      cursor: row-resize;
      height: 7.5px;
      width: 100%;
    }
  }
  @media (max-width: 480px) {
    .left-block,
    .right-block {
      min-height: 400px;
    }
  }
`;
// Update the FontBtnOuterBox style

export const FontBtnOuterBox = css`
  display: flex;
  align-items: center;
  background-color: #444444;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  border: 2px solid #000000;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1);
  transition: all 0.2s ease;
  
  &:hover {
    /* Keep black border */
    border: 2px solid #000000;
    transform: translateY(2px);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
  }

  svg {
    color: white;
    margin-right: 0.5rem;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    svg {
      cursor: pointer;
      margin: 0;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: scale(1.2);
      }
    }
    
    p {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 14px;
      color: white;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
    
    svg {
      font-size: 14px;
    }
    
    p {
      font-size: 12px;
    }
  }
`;
export const OutputBtnsContainer = css`
  height: 53px;
  padding: 10px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 48px;
    padding: 8px;
  }
  @media (max-width: 480px) {
    height: 44px;
  }
`;
export const ConnectionOuterBox = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: var(--biC);
  backdrop-filter: var(--blurC);

  > div:nth-of-type(1) {
    width: 90%;
    display: grid;
    place-content: center;
    place-items: center;
    gap: 30px;
  }
  > div:nth-of-type(1) p {
    width: 100%;
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 18px;
    color: var(--textColorA);
    letter-spacing: 0.5px;
    background: transparent;
    height: fit-content;
  }

  @media (max-width: 768px) {
    gap: 17.5px;

    > div:nth-of-type(1) {
      gap: 25px;
    }
    > div:nth-of-type(1) p {
      font-size: 17px;
    }
  }
  @media (max-width: 480px) {
    gap: 15px;

    > div:nth-of-type(1) {
      gap: 20px;
    }
    > div:nth-of-type(1) p {
      font-size: 16px;
    }
  }
`;

/* 

export const TechStack = css`

@media (max-width: 992px) {
}
@media (max-width: 768px) {
}
@media (max-width: 480px) {
}
`;

*/
