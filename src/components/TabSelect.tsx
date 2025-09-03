import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { SET_DISPLAY_TAB } from "../store/types";
import { DISPLAY_TAB } from "../consts/consts";
import { BG_DIAGRAM, BG_TOOLBOX, BG_VARIABLES, BG_WIRING } from "../consts/colors";

const Button = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 16px;
  outline: none;
  padding: 0.25rem;
  width: 33.33%;
`;
const Container = styled.div`
  display: flex;
  background: ${BG_TOOLBOX};
  grid-area: tab-select;
  justify-content: space-between;
`;

const TabSelect: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Button
        color={BG_VARIABLES}
        onClick={() => {
          dispatch({
            type: SET_DISPLAY_TAB,
            payload: { displayTab: DISPLAY_TAB.VARIABLES },
          });
        }}
      >
        VARIABLES
      </Button>
      <Button
        color={BG_DIAGRAM}
        onClick={() => {
          dispatch({
            type: SET_DISPLAY_TAB,
            payload: { displayTab: DISPLAY_TAB.DIAGRAM },
          });
        }}
      >
        DIAGRAM
      </Button>
      <Button
        color={BG_WIRING}
        onClick={() => {
          dispatch({
            type: SET_DISPLAY_TAB,
            payload: { displayTab: DISPLAY_TAB.WIRING },
          });
        }}
      >
        WIRING
      </Button>
    </Container>
  );
};

export default TabSelect;
