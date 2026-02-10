import {
  CustomTypography,
  DataError,
  LinksList,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { StatIcon } from '../../../../components/icons';
import { IListItem } from '../../../../components/lists/types';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_AWARDS_BY_PLAYER } from '../../types';

interface Props {
  data?: T_FETCH_AWARDS_BY_PLAYER;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerAwardsView({ data, loading, error }: Props) {
  const awardsData: IListItem[] =
    data?.awards.map(award => {
      return {
        icon: <StatIcon icon="mvp" />,
        label: (
          <CustomTypography color="data" bold size="xs">
            {award.awardName}
          </CustomTypography>
        ),
        value: (
          <CustomTypography color="data" bold size="xs">
            {award.season}
          </CustomTypography>
        ),
      };
    }) || [];

  const renderContent = () =>
    data && data?.awards.length === 0 ? (
      <NoDataText>No awards yet</NoDataText>
    ) : (
      <SectionContainer type={!loading && !!data?.awards.length ? 'winner' : undefined}>
        <LinksList links={awardsData} loading={loading} />
      </SectionContainer>
    );

  return (
    <SectionContainer title="Awards">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
