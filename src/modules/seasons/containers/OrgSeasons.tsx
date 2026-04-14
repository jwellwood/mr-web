import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, NoDataText, SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_ORG_SEASONS } from '../graphql';

export default function OrgSeasons() {
  const { t } = useTranslation('seasons');
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASONS, { variables: { orgId: orgId! } });

  const links: IListItem[] =
    data?.orgSeasons.map(season => {
      return {
        label: season.name,
        secondary: season.isCurrent ? (
          <CustomTypography color="primary">{t('LABELS.CURRENT')}</CustomTypography>
        ) : (
          ''
        ),
        link: `org_season/${season._id}`,
      };
    }) || [];

  const renderData = data?.orgSeasons.length ? (
    <SectionContainer>
      <LinksList links={links} />
    </SectionContainer>
  ) : (
    <NoDataText>{t('NO_DATA.SEASONS')}</NoDataText>
  );

  const renderContent = () => {
    return !loading ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
