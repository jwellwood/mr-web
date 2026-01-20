import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import type { ISelectOptions } from '../../../../components';
import Step1MatchDetails from '../add-match-details/Step1MatchDetails';
import Step2AddPlayers from '../add-match-players/Step2MatchPlayers';
import Step3MatchStats from '../add-match-player-stats/Step3MatchStats';
import Step4SubmitMatch from '../submit-match/Step4SubmitMatch';
import MatchOverview from './MatchOverview';
import { theme } from '../../../../theme';
import { ICompetition } from '../../../organization/types';
import { ITeam } from '../../../team/types';
import { IPlayerInMatch, ITempMatch } from '../../types';

interface Props {
  defaultValues: ITempMatch;
  currentPlayers: IPlayerInMatch[];
  seasonOptions: ISelectOptions[];
  onSubmit: () => void;
  teamId: string;
  opponents: ITeam[];
  competitions: ICompetition[];
  loading: boolean;
  error?: ApolloError;
}

export default function MatchFormStepper({
  defaultValues,
  currentPlayers,
  seasonOptions,
  onSubmit,
  teamId,
  opponents,
  competitions,
  loading,
  error,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = [
    <Step1MatchDetails
      onNextClick={handleNext}
      defaultValues={defaultValues}
      teamId={teamId}
      seasonOptions={seasonOptions}
      competitions={competitions}
      opponents={opponents}
      loading={loading}
      error={error}
    />,
    <Step2AddPlayers onNextClick={handleNext} teamId={teamId} loading={loading} error={error} />,
    <Step3MatchStats onNextClick={handleNext} currentPlayers={currentPlayers} error={error} />,
    <Step4SubmitMatch
      onSubmit={onSubmit}
      currentTempMatch={defaultValues}
      currentTempPlayers={currentPlayers}
      loading={loading}
      error={error}
    />,
  ];
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
      {activeStep !== 0 && <MatchOverview currentTempMatch={defaultValues} />}
      <Box>{steps[activeStep]}</Box>
    </Box>
  );
}
