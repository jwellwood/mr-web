import { Divider, Stack } from '@mui/material';
import {
  CustomTypography,
  ImageAvatar,
  LinkButton,
  PositionCell,
  SectionContainer,
} from '../../../../components';
import { T_FETCH_HALL_OF_FAME } from '../../types';
import CustomSkeleton from '../../../../components/loaders/CustomSkeleton';
import { theme } from '../../../../theme';
import FlagIcon from '../../../../components/icons/FlagIcon';

interface Props {
  player: T_FETCH_HALL_OF_FAME['players'][number];
  loading: boolean;
}

export default function HallOfFamePlayer({ player, loading }: Props) {
  const { name, nationality, image, position, squadNumber, description } = player;

  return (
    <SectionContainer isSpecial={!loading}>
      <Stack spacing={1} direction="row">
        <ImageAvatar
          size="80px"
          imageUrl={image.url}
          fallbackIcon="user"
          iconSize="70px"
          loading={loading}
        />

        <Stack
          direction="column"
          spacing={1}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <LinkButton type="text" link={`player/${player._id}`}>
            {loading ? (
              <CustomSkeleton width="100px" height="30px" />
            ) : (
              <CustomTypography bold size="lg" color="data">
                {name}
              </CustomTypography>
            )}
          </LinkButton>
          <Stack
            direction="row"
            spacing={1}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ background: theme.palette.secondary.light }}
              />
            }
          >
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
          </Stack>
          {loading ? (
            <CustomSkeleton width="180px" height="20px" />
          ) : (
            <CustomTypography color="label">{description || 'No description yet'}</CustomTypography>
          )}
        </Stack>
      </Stack>
    </SectionContainer>
  );
}
