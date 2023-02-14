import App from './App';
import { render, screen } from './utils/test-utils';

describe('<App />', () => {
  it('true to be true', () => {
    render(<App />);
    expect(
      screen.getByDisplayValue('Yarn berry zero install + Vite + Vitest')
    ).toBeInTheDocument();
  });
});
