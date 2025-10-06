import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface AppError {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  details?: string;
}

interface ErrorContextType {
  errors: AppError[];
  addError: (message: string, type?: AppError['type'], details?: string) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = (message: string, type: AppError['type'] = 'error', details?: string) => {
    const newError: AppError = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date(),
      details,
    };

    setErrors(prev => [...prev, newError]);

    // Auto-remove error after 5 seconds for non-error types
    if (type !== 'error') {
      setTimeout(() => {
        removeError(newError.id);
      }, 5000);
    }
  };

  const removeError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
