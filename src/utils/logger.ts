/**
 * Centralized error logging service
 * Can be extended to send errors to external services (Sentry, LogRocket, etc.)
 */

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log an error to console and external services
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.isDevelopment) {
      console.error(message, error, context);
    }

    // TODO: Send to external logging service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: context });
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(message, context);
    }
  }

  /**
   * Log info (only in development)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(message, context);
    }
  }

  /**
   * Log mutation/query errors from Apollo
   */
  graphqlError(operation: string, error: Error | unknown, variables?: LogContext): void {
    this.error(`GraphQL ${operation} failed`, error, variables);
  }
}

export const logger = new Logger();
