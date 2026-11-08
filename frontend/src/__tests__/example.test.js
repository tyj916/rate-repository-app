import { render, screen } from '@testing-library/react-native';

import { Text, View } from 'react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  );
};

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', async () => {
    await render(<Greeting name="Kalle" />);

    expect(screen.getByText('Hello Kalle!')).toBeDefined();
  });
});

describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});