import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { IPlayerInMatch, ITeam, ITempMatch } from '../../../types';
import AddMatchDetails from '../components/AddMatchDetails';
import AddMatchPlayers from '../components/AddMatchPlayers';
import AddMatchStats from '../components/AddMatchStats';
import SubmitMatch from '../components/SubmitMatch';
import MatchOverview from './MatchOverview';
import { theme } from '../../../theme';
import { ICompetition } from '../../organization/types';

interface Props {
  defaultValues: ITempMatch;
  currentPlayers: IPlayerInMatch[];
  seasonOptions: ISelectOptions[];
  onSubmit: () => void;
  teamId: string;
  opponents: ITeam[];
  competitions: ICompetition[];
}

const MatchFormStepper: React.FC<Props> = ({
  defaultValues,
  currentPlayers,
  seasonOptions,
  onSubmit,
  teamId,
  opponents,
  competitions,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = [
    <AddMatchDetails
      onNextClick={handleNext}
      defaultValues={defaultValues}
      teamId={teamId}
      seasonOptions={seasonOptions}
      competitions={competitions}
      opponents={opponents}
    />,
    <AddMatchPlayers onNextClick={handleNext} teamId={teamId} />,
    <AddMatchStats onNextClick={handleNext} currentPlayers={currentPlayers} />,
    <SubmitMatch
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
};

export default MatchFormStepper;
