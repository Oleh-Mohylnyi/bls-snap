import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 609px;

  @media (max-height: 768px) {
    max-height: 609px;
  }

  max-height: 79vh;
`;

export const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.small};
`;

export const RightPartContent = styled.div`
  padding: ${(props) => props.theme.spacing.small};
`;

export const RightPartContentHeader = styled.h1`
  color: ${(props) => props.theme.colors.text.default};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;
