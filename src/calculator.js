import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { useCalculator } from './useCalculator';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

const oneBlockWidth = 80; // 한 블럭에 해당하는 가로 길이

const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === 'reset'
      ? COLOR.RESET
      : type === 'operator'
      ? COLOR.OPERATOR
      : type === 'num'
      ? COLOR.NUM
      : 'transparent';

  return (
    <CustomButton
      onPress={onPress}
      flex={flex}
      backgroundColor={backgroundColor}
    >
      <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
    </CustomButton>
  );
};

const Calculator = () => {
  const {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  } = useCalculator();

  return (
    <CalculatorContainer>
      {/* 결과 */}
      <ResultContainer>
        <ResultText>{input}</ResultText>
      </ResultContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type={'reset'}
          text={hasInput ? 'C' : 'AC'}
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type={'operator'}
          text={'/'}
          onPress={() => onPressOperator('/')}
          flex={1}
          isSelected={currentOperator === '/'}
        />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`}
            type={'num'}
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={'operator'}
          text={'x'}
          onPress={() => onPressOperator('*')}
          flex={1}
          isSelected={currentOperator === '*'}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type={'num'}
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={'operator'}
          text={'-'}
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type={'num'}
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={'operator'}
          text={'+'}
          onPress={() => onPressOperator('+')}
          flex={1}
          isSelected={currentOperator === '+'}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button
          type={'num'}
          text={'0'}
          onPress={() => onPressNum(0)}
          flex={3}
        />
        <Button
          type={'operator'}
          text={'='}
          onPress={() => onPressOperator('=')}
          flex={1}
        />
      </ButtonContainer>
    </CalculatorContainer>
  );
};

export default Calculator;

const CalculatorContainer = styled.View`
  flex: 1;
  width: 250px;
  justify-content: center;
`;

const ResultContainer = styled.View`
  min-height: 50px;
  padding: 10px 5px;
  background-color: ${COLOR.RESULT};
`;

const ResultText = styled.Text`
  color: white;
  font-size: 35px;
  text-align: right;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const CustomButton = styled.TouchableOpacity`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
  align-items: center;
  height: 50px;
  width: ${(props) => oneBlockWidth * props.flex}px;
  border-width: ${(props) => (props.isSelected ? 1 : 0.2)}px;
  border-color: black;
`;
