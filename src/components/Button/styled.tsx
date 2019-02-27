import styled from 'styled-components';

const large = {
  rightPadding: '92px',
  width: '163px'
};

const theme = [{
  name: 'light',
  background: 'darkgray',
  color: 'black'
}, {
  name: 'orange',
  background: 'darkorange',
  color: 'white'
}, {
  name: 'active',
  background: 'darkorange',
  color: 'white'
}];

export const StyledButton = styled.button`
  width: ${props => (props.size === 'large' ? large.width : '76px')};
  padding-right: ${props => (props.size === 'large' ? large.rightPadding : '')};
  height: 76px;
  display: block;
  border-radius: 40px;
  border: none;
  margin: 5px;
  text-align: center;
  font-size: 1.6em;
  background: ${props => {
    const currentTheme = theme.filter(item => item.name === props.theme);
    return currentTheme.length > 0 ? currentTheme[0]['background'] : '#4e4e4e';
  }}
  color: ${props => {
    const currentTheme = theme.filter(item => item.name === props.theme);
    return currentTheme.length > 0 ? currentTheme[0]['color'] : 'white';
  }}
  font-family: 'Open Sans';

  &:focus {
    outline: none;
  }
`;
