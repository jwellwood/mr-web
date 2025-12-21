import { useQuery } from '@apollo/client';

import { FETCH_RESULT } from '../graphql';

import { AUTH_ROLES, LINK_TYPE } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES } from '../constants';
import { IListItem } from '../../../components/lists/types';
import { NoDataText, PageHeader } from '../../../components';
import ResultDetails from '../components/ResultDetails';

export default function Result() {
  const { orgId, resultId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const links: IListItem[] = [
    {
      label: 'Edit Result',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(FETCH_RESULT, {
    variables: { resultId: resultId },
  });

  const renderData = data?.result ? (
    <ResultDetails result={data?.result} />
  ) : (
    <NoDataText>No result found</NoDataText>
  );

  const renderContent = () => (loading ? <Spinner /> : renderData);

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.RESULT} links={isOrgAuth ? links : undefined}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
