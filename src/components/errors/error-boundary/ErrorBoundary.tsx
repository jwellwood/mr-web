import { Stack } from '@mui/material';
import React, { Component, ErrorInfo } from 'react';
import { SectionContainer } from '../..';
import { ROOT_URL } from '../../../constants';
import { CustomAlert } from '../../alerts';
import { CustomButton } from '../../buttons';
import { CustomStack } from '../../grids';
import { CustomTypography } from '../../typography';

interface State {
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = {
    errorMessage: '',
  };
  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  logErrorToServices = (error: string, stack?: string | null) => {
    // Log to console in development
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(error, stack);
    }

    // TODO: Add production error tracking (Sentry, LogRocket, etc.)
    // if (import.meta.env.PROD) {
    //   Sentry.captureException(new Error(error), {
    //     extra: { componentStack: stack }
    //   });
    // }
  };
  render() {
    if (this.state.errorMessage) {
      return (
        <SectionContainer title="There was a problem">
          <CustomStack spacing={4} align="center">
            <SectionContainer title="Error Details">
              <CustomAlert type="warning" text={this.state.errorMessage} />
            </SectionContainer>
            <CustomTypography color="label">
              Try refreshing the page, or go to the home page
            </CustomTypography>
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <CustomButton onClick={() => window.location.reload()}>Refresh</CustomButton>{' '}
              <CustomButton link={ROOT_URL}>Home</CustomButton>
            </Stack>
          </CustomStack>
        </SectionContainer>
      );
    }
    return this.props.children;
  }
}
