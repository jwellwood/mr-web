import React from 'react';
import { SectionContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import AppIcon from '../../../components/icons/AppIcon';
import { CustomTypography } from '../../../components/typography';
import { ITrophyResponse } from '../../../types';
type Props = {
  trophy?: ITrophyResponse;
};

const TrophyDetails: React.FC<Props> = ({ trophy }) => {
  if(!trophy) {
    return null;
  }
  const { name, isFinal, isWinner, season, opponent, comment } = trophy;

  const iconToDisplay = () => {
    if (isWinner) {
      return <AppIcon size="3rem" icon="trophy" color="gold" />;
    }
    return <AppIcon size="3rem" icon="medal" color="silver" />;
  };

  return (
    <SectionContainer>
      <CenteredGrid>
        <GridItem>{iconToDisplay()}</GridItem>
        <GridItem>
          <CustomTypography color="data" size="lg" bold>
            {name}
          </CustomTypography>
          <GridItem>
            <CustomTypography color="data" size="md" bold>
              {season}
            </CustomTypography>
          </GridItem>
        </GridItem>
        <GridItem>
          {isFinal ? (
            <CustomTypography color="label">vs {opponent}</CustomTypography>
          ) : null}
        </GridItem>
        {comment && (
          <CustomTypography color="label">{comment}</CustomTypography>
        )}
      </CenteredGrid>
    </SectionContainer>
  );
};

export default TrophyDetails;
