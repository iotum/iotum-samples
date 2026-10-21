import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Menu from './pages/menu-page/MenuPage';
import Token from './pages/token-page/TokenPage';

const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock('wouter', () => ({
  useLocation: () => ['/', mockNavigate],
}));

afterEach(cleanup);

test('redirects to error page without credentials', () => {
  const { container } = render(
    <Menu />
  );

  expect(container.querySelector('.menu-container')).toBeNull();
  expect(mockNavigate).toHaveBeenCalledWith('/error-handling');
});

describe('setting credentials', () => {
  beforeEach(() => {
    const { getByRole } = render(
      <Token />
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
      <Menu />
    );
    expect(container.querySelector('.menu-container')).not.toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
