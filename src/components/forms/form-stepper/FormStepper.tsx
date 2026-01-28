import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { theme } from '../../../theme';

interface Props {
  steps: ReactNode[];
  activeStep: number;
  handleBack?: () => void;
  children: ReactNode;
}

export default function FormStepper({ steps, activeStep, handleBack, children }: Props) {
  const maxSteps = steps.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MobileStepper
        sx={{
          position: 'relative',
          background: theme.palette.secondary.main,
        }}
        variant="dots"
        steps={maxSteps}
        position="top"
        activeStep={activeStep}
        nextButton={false}
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="warning">
            Back
          </Button>
        }
      />
      {children}
      {/* <Box>{steps[activeStep]}</Box> */}
    </Box>
  );
}
