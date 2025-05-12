import React, { Component, ErrorInfo } from 'react';
import { ROOT_URL } from '../app/constants';
import { CustomButton, CustomLinkButton } from '../components/buttons';
import { SectionContainer } from '../components/containers';
import { CustomTypography } from '../components/typography';

interface State {
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = {
    errorMessage: '',
  };
  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
  // A fake logging service for now // TODO
  // eslint-disable-next-line no-console
  logErrorToServices = console.log;
  render() {
    if (this.state.errorMessage) {
      return (
        <>
          <SectionContainer title="Something went wrong">
            <CustomTypography color="warning">
              There was a problem: {this.state.errorMessage || 'Unknown'}. Check your network
              connection and try refreshing the page.
            </CustomTypography>
            <div>
              <CustomButton onClick={() => window.location.reload()}>Refresh</CustomButton>
            </div>
            <CustomTypography color="warning">or try a different page:</CustomTypography>

            <CustomLinkButton link={ROOT_URL}>Home</CustomLinkButton>
          </SectionContainer>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
