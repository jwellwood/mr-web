import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, NoDataText, SectionContainer } from '../../../../components';
import { StatIcon } from '../../../../components/icons';
import { LinksList, type IListItem } from '../../../../components/lists';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_AWARDS_BY_PLAYER } from '../../graphql';

interface Props {
  data?: T_FETCH_AWARDS_BY_PLAYER;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerAwardsView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const { teamId, orgId } = useCustomParams();
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
        link: `/org/${orgId}/team/${teamId}/season/${award.season}/award/${award._id}`,
      };
    }) || [];

  const renderContent = () =>
    data && data?.awards.length === 0 ? (
      <NoDataText>{t('MESSAGES.NO_AWARDS')}</NoDataText>
    ) : (
      <SectionContainer type={!loading && !!data?.awards.length ? 'winner' : undefined}>
        <LinksList links={awardsData} loading={loading} />
      </SectionContainer>
    );

  return (
    <SectionContainer title={t('SECTIONS.AWARDS')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
