import { useState } from 'react';
import { ApolloError } from '@apollo/client';

import { FormStepper } from '../../../../components';
import Step1MatchDetails from '../add-match-details/Step1MatchDetails';
import Step2AddPlayers from '../add-match-players/Step2MatchPlayers';
import Step3MatchStats from '../add-match-player-stats/Step3MatchStats';
import Step4SubmitMatch from '../submit-match/Step4SubmitMatch';
import MatchOverview from './MatchOverview';

interface Props {
  onSubmit: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function MatchFormStepper({ onSubmit, loading, error }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = [
    <Step1MatchDetails onNextClick={handleNext} loading={loading} error={error} />,
    <Step2AddPlayers onNextClick={handleNext} loading={loading} error={error} />,
    <Step3MatchStats onNextClick={handleNext} error={error} />,
    <Step4SubmitMatch onSubmit={onSubmit} loading={loading} error={error} />,
  ];

  return (
    <FormStepper steps={steps} activeStep={activeStep} handleBack={handleBack}>
      <>
        {activeStep !== 0 && <MatchOverview />}
        {steps[activeStep]}
      </>
    </FormStepper>
  );
}
