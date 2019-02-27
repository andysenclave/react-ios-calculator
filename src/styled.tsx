import styled from 'styled-components';

export const App = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans';

  & > * {
    font-family: 'Open Sans';
  }

  :focus {
    outline: none;
  }
`;

export const CalculatorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #272727;
  max-width: 375px;
  max-height: 812px;

  & > * {
    padding: 15px;
  }

  & > div:first-child {
    flex: 3;
  }

  & > div:last-child {
    flex: 7;
  }
`;
