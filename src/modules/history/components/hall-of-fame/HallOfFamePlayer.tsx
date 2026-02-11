import {
  CustomButton,
  CustomTypography,
  ImageAvatar,
  PositionCell,
  SectionContainer,
} from '../../../../components';
import { CustomGridContainer, CustomStack } from '../../../../components/grids';
import { FlagIcon } from '../../../../components/icons';
import CustomSkeleton from '../../../../components/loaders/custom-skeleton/CustomSkeleton';
import { T_FETCH_HALL_OF_FAME } from '../../types';

interface Props {
  player: T_FETCH_HALL_OF_FAME['players'][number];
  loading: boolean;
}

export default function HallOfFamePlayer({ player, loading }: Props) {
  const { name, nationality, image, position, squadNumber, description } = player;

  return (
    <SectionContainer type={!loading ? 'winner' : undefined}>
      <CustomGridContainer direction="row">
        <ImageAvatar
          size="80px"
          imageUrl={image.url}
          fallbackIcon="user"
          iconSize="70px"
          loading={loading}
        />

        <CustomStack direction="column" spacing={1} justify="center" align="flex-start">
          <CustomButton variant="text" link={`player/${player._id}`}>
            {loading ? (
              <CustomSkeleton width="100px" height="30px" />
            ) : (
              <CustomTypography bold size="lg" color="data">
                {name}
              </CustomTypography>
            )}
          </CustomButton>
          <CustomStack direction="row" spacing={1} divider>
            <SectionContainer>
              {loading ? (
                <CustomSkeleton width="30px" height="30px" />
              ) : (
                <CustomTypography size="md" color="label" bold>
                  #{squadNumber}
                </CustomTypography>
              )}
            </SectionContainer>
            <SectionContainer>
              {loading ? (
                <CustomSkeleton width="30px" height="30px" />
              ) : (
                <PositionCell size="sm">{position}</PositionCell>
              )}
            </SectionContainer>
            <SectionContainer>
              {loading ? (
                <CustomSkeleton width="30px" height="30px" />
              ) : (
                <FlagIcon nationality={nationality || ''} size="20px" />
              )}
            </SectionContainer>
          </CustomStack>
          {loading ? (
            <CustomSkeleton width="180px" height="20px" />
          ) : (
            <CustomTypography color="label">{description || 'No description yet'}</CustomTypography>
          )}
        </CustomStack>
      </CustomGridContainer>
    </SectionContainer>
  );
}
