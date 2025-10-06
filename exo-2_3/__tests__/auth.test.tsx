import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../src/pages/Login';
import { AuthProvider } from '../src/context/AuthContext';
import { ErrorProvider } from '../src/context/ErrorContext';

// Déclarations TypeScript pour Jest
declare const describe: (name: string, fn: () => void) => void;
declare const test: (name: string, fn: () => void) => void;
declare const expect: (value: any) => any;

// Mock simple pour fetch
global.fetch = (() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ token: 'test-token' })
})) as any;

// Wrapper pour tous les providers nécessaires
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorProvider>
    <AuthProvider>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </AuthProvider>
  </ErrorProvider>
);

describe('Login Component Tests', () => {
  test('should render login form with all required elements', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    // Vérifier que tous les éléments du formulaire sont présents
    expect(screen.getByRole('heading', { name: /connexion/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('student@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    
    // Vérifier le texte d'aide
    expect(screen.getByText(/test: student@example.com/i)).toBeInTheDocument();
  });

  test('should allow typing in email and password fields', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('student@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;

    // Tester la saisie dans les champs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('mypassword');
  });

  test('should have correct input attributes', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('student@example.com');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /se connecter/i });

    // Vérifier les types et attributs
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'student@example.com');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('placeholder', 'password');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  test('should handle form interaction correctly', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText('student@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('password') as HTMLInputElement;

    // Remplir le formulaire
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    
    // Vérifier que les valeurs sont présentes
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');

    // Le formulaire devrait être interactif
    expect(emailInput).not.toBeDisabled();
    expect(passwordInput).not.toBeDisabled();
  });

  test('should contain expected labels', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    // Vérifier que les labels sont présents (même sans association)
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Mot de passe:')).toBeInTheDocument();
  });
});