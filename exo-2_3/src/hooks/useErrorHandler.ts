import { useCallback } from 'react';
import { useError } from '../context/ErrorContext';

export function useErrorHandler() {
  const { addError } = useError();

  const handleError = useCallback((error: unknown, context?: string) => {
    let message = 'Une erreur inattendue s\'est produite';
    let details: string | undefined;

    if (error instanceof Error) {
      message = error.message;
      details = error.stack;
    } else if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
    }

    if (context) {
      message = `${context}: ${message}`;
    }

    addError(message, 'error', details);
  }, [addError]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, context);
      return null;
    }
  }, [handleError]);

  const showSuccess = useCallback((message: string) => {
    addError(message, 'info');
  }, [addError]);

  const showWarning = useCallback((message: string) => {
    addError(message, 'warning');
  }, [addError]);

  return {
    handleError,
    handleAsyncError,
    showSuccess,
    showWarning,
  };
}
