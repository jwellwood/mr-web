import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CustomTypography, ImageAvatar, NoDataText } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { IMAGE_TYPE } from '../../../constants';
import { getAuth } from '../../../store';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_ORGS_BY_USER_QUERY } from '../graphql';
import EntityListWrapper from './EntityListWrapper';

interface Props {
  loading: boolean;
  data?: T_FETCH_ORGS_BY_USER_QUERY;
  error?: TApolloError;
}

export default function ProfileOrgsView({ data, loading, error }: Props) {
  const { t } = useTranslation('profile');
  const { orgIds } = useSelector(getAuth);
  const { orgs } = data || {};

  const links: IListItem[] = orgs
    ? orgs?.map(org => {
        const isAdmin = orgIds.includes(org._id);
        return {
          label: org.name,
          link: `/org/${org._id}`,
          secondary: (
            <CustomTypography color={isAdmin ? 'tertiary' : 'info'}>
              {t(isAdmin ? 'LABELS.ADMIN' : 'LABELS.USER')}
            </CustomTypography>
          ),
          avatar: (
            <ImageAvatar imageUrl={org.badge.url} alt={org.name} fallbackIcon={IMAGE_TYPE.BADGE} />
          ),
        };
      })
    : [];

  return (
    <EntityListWrapper type="organization" error={error} loading={loading}>
      {error ? null : links.length ? (
        <LinksList links={links} loading={loading} />
      ) : (
        <NoDataText>{t('NO_RESULTS.ORGANIZATION.TITLE')}</NoDataText>
      )}
    </EntityListWrapper>
  );
}
