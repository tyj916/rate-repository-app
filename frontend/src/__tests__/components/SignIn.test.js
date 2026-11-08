import { fireEvent, render, screen } from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      await render(<SignInForm onSubmit={onSubmit} />);

      await fireEvent.changeText(screen.getByPlaceholderText('Username'), 'matti');
      await fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      await fireEvent.press(screen.getByText('Sign in'));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'matti',
        password: 'password',
      });
    });
  });
});
