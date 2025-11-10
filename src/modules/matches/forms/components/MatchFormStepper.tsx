import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';

import { ISelectOptions } from '../../../../components/inputs/SelectInput';
import { IPlayerInMatch } from '../../../../types';
import Step1MatchDetails from '../steps/Step1MatchDetails';
import Step2AddPlayers from '../steps/Step2MatchPlayers';
import Step3MatchStats from '../steps/Step3MatchStats';
import Step4SubmitMatch from '../steps/Step4SubmitMatch';
import MatchOverview from '../../components/MatchOverview';
import { theme } from '../../../../theme';
import { ICompetition } from '../../../organization/types';
import { ITeam } from '../../../team/types';
import { ITempMatch } from '../../types';

type Props = {
  defaultValues: ITempMatch;
  currentPlayers: IPlayerInMatch[];
  seasonOptions: ISelectOptions[];
  onSubmit: () => void;
  teamId: string;
  opponents: ITeam[];
  competitions: ICompetition[];
};

export default function MatchFormStepper({
  defaultValues,
  currentPlayers,
  seasonOptions,
  onSubmit,
  teamId,
  opponents,
  competitions,
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
    />,
    <Step2AddPlayers onNextClick={handleNext} teamId={teamId} />,
    <Step3MatchStats onNextClick={handleNext} currentPlayers={currentPlayers} />,
    <Step4SubmitMatch
      onSubmit={onSubmit}
      currentTempMatch={defaultValues}
      currentTempPlayers={currentPlayers}
    />,
  ];
  const maxSteps = steps.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {activeStep !== 0 && <MatchOverview currentTempMatch={defaultValues} />}
      <Box>{steps[activeStep]}</Box>
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
    </Box>
  );
}
