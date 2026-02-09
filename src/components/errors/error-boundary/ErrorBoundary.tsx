import { Stack } from '@mui/material';
import React, { Component, ErrorInfo } from 'react';
import { ErrorText } from '..';
import { SectionContainer } from '../..';
import { ROOT_URL } from '../../../constants';
import { CustomButton, LinkButton } from '../../buttons';
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
        <SectionContainer title={<ErrorText>Something went wrong</ErrorText>}>
          <Stack sx={{ textAlign: 'center' }}>
            <CustomTypography color="label">There was a problem</CustomTypography>

            <SectionContainer>
              <CustomTypography color="warning">
                {this.state.errorMessage || 'Unknown'}
              </CustomTypography>
            </SectionContainer>

            <CustomTypography color="label">
              Try refreshing the page, or go to the home page
            </CustomTypography>
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <CustomButton onClick={() => window.location.reload()}>Refresh</CustomButton>{' '}
              <LinkButton link={ROOT_URL}>Home</LinkButton>
            </Stack>
          </Stack>
        </SectionContainer>
      );
    }
    return this.props.children;
  }
}
