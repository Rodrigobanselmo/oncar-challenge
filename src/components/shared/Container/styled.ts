import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IContainerStyled {
  isDarkMode: boolean;
}

export const ContainerStyled = styled(Box)<IContainerStyled>`
  &::-webkit-scrollbar {
    width: 0.6rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[400]};
    width: 10px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[500]};
  }

  ${(props) =>
    props.isDarkMode &&
    css`
      &::-webkit-scrollbar-track {
        background: ${props.theme.colors.gray[800]};
      }
      &::-webkit-scrollbar-thumb {
        background: ${props.theme.colors.gray[700]};
        width: 10px;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: ${props.theme.colors.gray[500]};
      }
    `}
`;
