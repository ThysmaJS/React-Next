import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { AppError } from '../context/ErrorContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      const appError: AppError = {
        id: crypto.randomUUID(),
        message: error.message,
        type: 'error',
        timestamp: new Date(),
        details: errorInfo.componentStack || undefined,
      };
      this.props.onError(appError);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>Oops! Quelque chose s'est mal passé</h2>
            <p>Une erreur inattendue s'est produite dans l'application.</p>
            <details className="error-details">
              <summary>Détails de l'erreur</summary>
              <pre>{this.state.error?.message}</pre>
              <pre>{this.state.error?.stack}</pre>
            </details>
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="retry-button"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
