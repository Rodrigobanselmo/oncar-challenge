import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const GridShadowHover = styled(Grid)`
  position: relative;
  transition: transform 1s ease;
  border-radius: 20px;

  &:hover {
    transform: translateY(-0.35em) scale(1.02);
    &:after {
      opacity: 1;
    }
  }
  &:after {
    content: "";
    position: absolute;
    border-radius: 20px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    box-shadow: 0 0.75rem 2rem -0.5em rgba(0, 0, 0, 0.3);
    transition: opacity 1s ease;
  }
`;
