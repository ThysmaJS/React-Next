import { useError } from '../context/ErrorContext';

export function ErrorDisplay() {
  const { errors, removeError } = useError();

  // Afficher seulement la dernière notification
  const latestError = errors[errors.length - 1];

  if (!latestError) {
    return null;
  }

  const getStyles = (type: string) => {
    const baseStyle = {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      zIndex: 1000,
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '400px',
      minWidth: '300px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      animation: 'slideIn 0.3s ease-out',
    };

    switch (type) {
      case 'error':
        return { ...baseStyle, backgroundColor: '#fff5f5', borderLeft: '4px solid #dc3545' };
      case 'warning':
        return { ...baseStyle, backgroundColor: '#fffbf0', borderLeft: '4px solid #ffc107' };
      case 'info':
        return { ...baseStyle, backgroundColor: '#f0f9ff', borderLeft: '4px solid #17a2b8' };
      default:
        return { ...baseStyle, backgroundColor: '#fff', borderLeft: '4px solid #6c757d' };
    }
  };

  return (
    <div style={getStyles(latestError.type)}>
      <span style={{ fontSize: '1.2rem' }}>
        {latestError.type === 'error' && '❌'}
        {latestError.type === 'warning' && '⚠️'}
        {latestError.type === 'info' && 'ℹ️'}
      </span>
      
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '500', marginBottom: '4px' }}>
          {latestError.message}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>
          {latestError.timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      <button
        onClick={() => removeError(latestError.id)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#666',
          padding: '0',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-label="Fermer la notification"
      >
        ×
      </button>
    </div>
  );
}
