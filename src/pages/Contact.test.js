import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Contact } from './Contact';
import { lightTheme } from '../styles/theme';

const renderContact = () => render(<ThemeProvider theme={lightTheme}><Contact /></ThemeProvider>);
const fillForm = () => {
  fireEvent.change(screen.getByLabelText('contact.nameLabel'), { target: { value: 'Test Person' } });
  fireEvent.change(screen.getByLabelText('contact.emailLabel'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('contact.messageLabel'), { target: { value: 'A message with spaces' } });
};
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'contact.submit' }));

beforeEach(() => { global.fetch = jest.fn(); });
afterEach(() => { delete global.fetch; });

test('invalid fields do not send a request', () => {
  renderContact();
  submit();
  expect(fetch).not.toHaveBeenCalled();
  expect(screen.getByRole('alert')).toHaveTextContent('contact.validationError');
});

test('preserves spaces while typing and clears fields only after confirmed success', async () => {
  let resolveRequest;
  fetch.mockReturnValue(new Promise(resolve => { resolveRequest = resolve; }));
  renderContact();
  fillForm();
  fireEvent.change(screen.getByLabelText('contact.messageLabel'), { target: { value: '  Hello world \nSecond line ' } });
  expect(screen.getByLabelText('contact.messageLabel')).toHaveValue('Hello world \nSecond line ');
  submit();
  expect(screen.getByRole('button', { name: 'contact.sending' })).toBeDisabled();
  expect(screen.getByLabelText('contact.messageLabel')).toHaveValue('Hello world \nSecond line');
  fireEvent.submit(screen.getByLabelText('contact.nameLabel').closest('form'));
  expect(fetch).toHaveBeenCalledTimes(1);
  const [url, request] = fetch.mock.calls[0];
  expect(url).toBe('https://api.web3forms.com/submit');
  expect(JSON.parse(request.body)).toMatchObject({ name: 'Test Person', email: 'test@example.com', message: 'Hello world \nSecond line', botcheck: false });
  await act(async () => resolveRequest({ ok: true, json: async () => ({ success: true }) }));
  expect(screen.getByRole('status')).toHaveTextContent('contact.sendSuccess');
  for (const field of ['name', 'email', 'message']) expect(screen.getByLabelText(`contact.${field}Label`)).toHaveValue('');
});

test.each([
  ['service rejection', () => Promise.resolve({ ok: true, json: async () => ({ success: false }) })],
  ['HTTP error', () => Promise.resolve({ ok: false, json: async () => ({ success: true }) })],
  ['network error', () => Promise.reject(new Error('offline'))],
])('%s preserves the draft and allows retry', async (_, response) => {
  fetch.mockImplementation(response);
  renderContact();
  fillForm();
  submit();
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('contact.sendError'));
  expect(screen.getByLabelText('contact.messageLabel')).toHaveValue('A message with spaces');
  expect(screen.getByRole('button', { name: 'contact.submit' })).toBeEnabled();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
