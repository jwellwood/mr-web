import { useQuery } from '@apollo/client';

import { FETCH_HALL_OF_FAME } from '../graphql';

import { SectionContainer } from '../../../components';
import FlagIcon from '../../../components/icons/FlagIcon';
import LinksList from '../../../components/lists/LinksList';
import { Spinner } from '../../../components/loaders';
import PositionString from '../../../components/tables/PositionString';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { IListItem } from '../../../components/lists/types';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';

export default function HallOfFame() {
  const { teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_HALL_OF_FAME, {
    variables: { teamId },
  });

  const links: IListItem[] =
    data?.players.map(player => {
      return {
        avatar: <ImageAvatar size="40px" imageUrl={player.image.url} loading={loading} />,
        link: `player/${player._id}`,
        label: (
          <CustomTypography color="data" bold size="sm">
            {player.name}
          </CustomTypography>
        ),
        secondary: (
          <>
            <PositionString>{player.position}</PositionString> |{' '}
            <FlagIcon nationality={player.nationality} /> |{' '}
            <CustomTypography color="label" bold>
              <CustomTypography size="xs" color="label">
                #
              </CustomTypography>
              {player.squadNumber}
            </CustomTypography>
          </>
        ),
      };
    }) || [];

  const renderContent = () => {
    return !loading ? (
      <>
        {!data?.players?.length ? (
          <CustomTypography color="warning">No hall of fame players yet</CustomTypography>
        ) : (
          <SectionContainer>
            <LinksList links={links} />
          </SectionContainer>
        )}
      </>
    ) : (
      <Spinner />
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
