import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './components/ReduxStore';
import Menu from './pages/menu-page/MenuPage';
import Token from './pages/token-page/TokenPage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

test('redirects to error page without credentials', () => {
  const { container } = render(
    <Provider store={store}><Menu /></Provider>
  );

  expect(container.querySelector('.menu-container')).toBeNull();
  expect(mockNavigate).toHaveBeenCalledWith('/iotum-samples/error-handling');
});

describe('setting credentials', () => {
  beforeEach(() => {
    const { getByRole } = render(
      <Provider store={store}><Token /></Provider>
    );

    fireEvent.change(
      getByRole('textbox', { name: 'Domain:' }), { target: { value: 'my.domain.com' } }
    );
    fireEvent.change(
      getByRole('textbox', { name: 'SSO Token:' }), { target: { value: 'my-secret-token' } }
    );
    fireEvent.change(
      getByRole('textbox', { name: 'Host ID:' }), { target: { value: '42' } }
    );
    fireEvent.click(
      getByRole('button', { name: 'Submit' })
    );

    mockNavigate.mockClear();
  });

  test('show menu with credentials', () => {
    const { container } = render(
      <Provider store={store}><Menu /></Provider>
    );
    expect(container.querySelector('.menu-container')).not.toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
