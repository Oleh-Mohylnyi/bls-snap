import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 80px;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  justify-content: center;
  color: ${(props) => props.theme.colors.text};
  align-items: center;
  display: flex;
`;
