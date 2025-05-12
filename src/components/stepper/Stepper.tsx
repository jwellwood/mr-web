import React, { ReactNode } from 'react';
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface Props {
  steps: {
    component: ReactNode;
  }[];
  step: number;
  handleBackClick: () => void;
}

// Using MUI's internal class names directly

const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  [`& .MuiMobileStepper-dots`]: {
    color: theme.palette.success.light,
  },
  [`& .MuiMobileStepper-dot`]: {
    background: theme.palette.primary.light,
  },
  [`& .MuiMobileStepper-dotActive`]: {
    background: theme.palette.success.light,
  },
}));

const Stepper: React.FC<Props> = ({ steps, step, handleBackClick }) => {
  return (
    <div>
      <StyledMobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={step}
        sx={{ flexGrow: 1, background: 'transparent' }}
        nextButton={null}
        backButton={
          <Button disabled={step === 0} onClick={handleBackClick}>
            Back
          </Button>
        }
      />
      {steps[step].component}
    </div>
  );
};

export default Stepper;
