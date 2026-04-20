export type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | null }>;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
