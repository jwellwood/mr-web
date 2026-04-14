import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, PageHeader } from '../../../components';
import { IListItem } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { LINK_TYPE } from '../../../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import ResultDetails from '../components/ResultDetails';
import { T_FETCH_RESULT } from '../graphql';

interface Props {
  data?: T_FETCH_RESULT;
  loading: boolean;
  error?: TApolloError;
}

export default function ResultPage({ data, loading, error }: Props) {
  const { t } = useTranslation('results');
  const { orgId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const links: IListItem[] = [
    {
      label: t('LINKS.EDIT_RESULT'),
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const renderData = data?.result ? (
    <ResultDetails result={data.result} />
  ) : (
    <NoDataText>{t('NO_DATA.RESULT')}</NoDataText>
  );

  const renderContent = () => (loading ? <Spinner /> : renderData);

  return (
    <PageHeader title={t('PAGES.RESULT')} links={isOrgAuth ? links : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
