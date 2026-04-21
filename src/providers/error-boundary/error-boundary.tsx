import React from 'react';
import { View, Text } from 'react-native';
import { ErrorBoundaryProps, ErrorBoundaryState } from './error-boundary.types';
import { styles } from './error-boundary.styles';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback: Fallback } = this.props;

    if (hasError) {
      if (Fallback) {
        return <Fallback error={error} />;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Something went wrong.</Text>
        </View>
      );
    }

    return children;
  }
}
