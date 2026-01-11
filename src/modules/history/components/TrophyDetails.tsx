import { SectionContainer } from '../../../components';
import { CenteredGrid, GridItem } from '../../../components/grids';
import AppIcon from '../../../components/icons/AppIcon';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import { ITrophyResponse } from '../types';

type Props = {
  trophy?: ITrophyResponse;
  loading: boolean;
};

export default function TrophyDetails({ trophy, loading }: Props) {
  const { name, isFinal, isWinner, season, opponent, comment } = trophy || {};

  const iconToDisplay = () => {
    if (isWinner) {
      return <AppIcon size="3rem" icon="trophy" color="gold" />;
    }
    return <AppIcon size="3rem" icon="medal" color="silver" />;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <SectionContainer isSpecial>
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
          {isFinal ? <CustomTypography color="label">vs {opponent}</CustomTypography> : null}
        </GridItem>
        {comment && <CustomTypography color="label">{comment}</CustomTypography>}
      </CenteredGrid>
    </SectionContainer>
  );
}
