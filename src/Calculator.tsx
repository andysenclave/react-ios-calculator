import React, { PureComponent } from 'react';

import DisplayPanel from './components/DisplayPanel';
import NumPad from './components/NumPad';
import { App, CalculatorBox } from './styled';
import config from './constants/app.config';

class Calculator extends PureComponent {
  state = {
    currentValue: '0',
    activeOperator: '',
    inMemoryValue: '0'
  };

  keyPressHandler = event => {
    const { inputRegex } = config;
    let value = event.key;
    if(value !== undefined && value !== null) {
      if(inputRegex.test(value)) {
        this.addValue(value);
      }
      if(value === 'Delete' || value === 'Backspace') {
        this.deleteValue();
      }
      if(value === '%') {
        this.percentOperation();
      }
      if(['+', '-', '*', '/'].indexOf(value) > -1) {
        value = value === '*' ? 'x' : value;
        value = value === '/' ? '÷' : value;
        this.saveOperator(value);
      }
      if(value === '=' || value === 'Enter') {
        this.performOperation();
      }
    }
  }

  buttonClickHandler = element => {
    const { inputRegex } = config;
    if(element !== undefined && element !== null) {
      if(inputRegex.test(element)) {
        this.addValue(element);
      }
      if(['AC', 'C'].indexOf(element) > -1) {
        this.resetValue();
      }
      if(element === '+/-') {
        this.toggleSign();
      }
      if(element === '%') {
        this.percentOperation();
      }
      if(['+', '-', 'x', '÷'].indexOf(element) > -1) {
        this.saveOperator(element);
      }
      if(element === '=') {
        this.performOperation();
      }
    }
  }

  addValue = value => {
    let { currentValue, activeOperator, inMemoryValue } = this.state;
    if(activeOperator !== '' && inMemoryValue === '0') {
      inMemoryValue = `${currentValue}`;
      currentValue = '0';
    }
    let updatedValue = currentValue;
    let firstDigitPosition = currentValue.charAt(0) === '-' ? 1 : 0;
    
    if(currentValue.charAt(firstDigitPosition) === '0' && currentValue.charAt(firstDigitPosition + 1) !== '.' && value !== '.') {
      updatedValue = currentValue.substring(0, firstDigitPosition) + currentValue.substring(firstDigitPosition + 1, currentValue.length);
    }
    if((value === '.' && currentValue.indexOf('.') === -1) || value !== '.') {
      updatedValue = `${updatedValue}${value}`
    }
    if(currentValue.length < 11) {
      this.setState({
        currentValue: updatedValue,
        inMemoryValue: inMemoryValue
      });
    }
  }

  deleteValue = () => {
    let { currentValue } = this.state;
    if(currentValue.length > 0) {
      let updatedValue = currentValue.slice(0, -1);
      if (updatedValue.length === 0) {
        updatedValue = '0';
      }
      this.setState({
        currentValue: updatedValue
      });
    }
  }

  resetValue = () => {
    let { currentValue, inMemoryValue, activeOperator } = this.state;
    
    if(currentValue === '0') {
      activeOperator = '';
      inMemoryValue = '0';
    }
    this.setState({
      currentValue: '0',
      inMemoryValue: inMemoryValue,
      activeOperator: activeOperator
    });
  }

  toggleSign = () => {
    const { currentValue } = this.state;
    let updatedValue = currentValue;
    let currentSign = currentValue.charAt(0);
    if(currentSign !== '-') {
      updatedValue = `-${updatedValue}`;
    } else {
      updatedValue = updatedValue.slice(1);
    }
    this.setState({
      currentValue: updatedValue
    });
  }

  percentOperation = () => {
    const { currentValue } = this.state;
    let updatedValue = parseFloat(currentValue) / 100;
    this.setState({
      currentValue: `${updatedValue}`
    });
  }

  saveOperator = operator => {
    const { activeOperator, inMemoryValue } = this.state;
    if(activeOperator !== '') {
      this.performOperation();
    }

    this.setState({
      activeOperator: operator,
      inMemoryValue: '0'
    });
  }

  performOperation = () => {
    const { activeOperator, currentValue, inMemoryValue } = this.state;
    let result: number | string = 0;

    if(activeOperator === '+') {
      result = parseFloat(inMemoryValue) + parseFloat(currentValue);
    } else if(activeOperator === '-') {
      result = parseFloat(inMemoryValue) - parseFloat(currentValue);
    } else if(activeOperator === 'x') {
      result = parseFloat(inMemoryValue) * parseFloat(currentValue);
    } else if(activeOperator === '÷') {
      if(parseFloat(currentValue) !== 0 || parseFloat(currentValue) !== -0) {
        result = parseFloat(inMemoryValue) / parseFloat(currentValue);
      } else {
        result = 'Error';
      }
    }
    if(typeof result === 'number' && result.toString().length > 11) {
      result = result.toFixed(9);
    }

    this.setState({
      currentValue: `${result}`,
      activeOperator: ''
    });
  }

  render() {
    return (
      <App onKeyDown={this.keyPressHandler}>
        <CalculatorBox>
          <DisplayPanel 
            value={this.state.currentValue}
          />
          <NumPad
            value={this.state.currentValue}
            items={config.numpadItems}
            onClick={this.buttonClickHandler}
            activeOperator={this.state.activeOperator}
          />
        </CalculatorBox>
      </App>
    );
  }
}

export default Calculator;
