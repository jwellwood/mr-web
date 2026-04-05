import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer, ModuleHeader } from '../../../components';
import { TextList } from '../../../components/lists';
import { IMAGE_TYPE } from '../../../constants';
import { useDateOfBirth } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import { parseDate } from '../../../utils';
import { T_FETCH_USER_QUERY } from '../graphql';
import GettingStarted from './GettingStarted';

interface Props {
  data?: T_FETCH_USER_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function ProfileView({ data, loading, error }: Props) {
  const { t } = useTranslation('profile');
  const { image, username, dateOfBirth, nationality, email, createdAt, updatedAt } =
    data?.user || {};
  const { age } = useDateOfBirth(dateOfBirth as string);

  const details = [
    { label: t('LIST_ITEMS.EMAIL'), value: email || '-' },
    { label: t('LIST_ITEMS.CREATED'), value: parseDate(createdAt as string) || '-' },
    { label: t('LIST_ITEMS.UPDATED'), value: parseDate(updatedAt as string) || '-' },
  ] as const;

  return (
    <>
      {error ? (
        <DataError error={error} />
      ) : (
        <>
          <ModuleHeader
            loading={loading}
            title={username}
            badge={image?.url}
            data={[
              { label: '', value: dateOfBirth ? parseDate(dateOfBirth as string) : '-' },
              { label: t('LIST_ITEMS.AGE'), value: dateOfBirth ? age : '-' },
            ]}
            country={nationality}
            type={IMAGE_TYPE.USER}
          />
          <SectionContainer>
            <TextList data={details} loading={loading} />
          </SectionContainer>
          <GettingStarted profile={data?.user} />
        </>
      )}
    </>
  );
}
