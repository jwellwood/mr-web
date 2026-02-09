import { ApolloError } from '@apollo/client';
import { DataError, SectionContainer, ModuleHeader } from '../../../components';
import TextList from '../../../components/lists/TextList';
import { IMAGE_TYPE } from '../../../constants';
import { useDateOfBirth } from '../../../hooks';
import { parseDate } from '../../../utils/helpers';
import { FETCH_USER_QUERY } from '../types';

interface Props {
  data?: FETCH_USER_QUERY;
  loading: boolean;
  error?: ApolloError;
}

export default function ProfileView({ data, loading, error }: Props) {
  const { image, username, dateOfBirth, nationality, email, createdAt, updatedAt } =
    data?.user || {};
  const { age } = useDateOfBirth(dateOfBirth as string);

  const details = [
    { label: 'Email', value: email || '-' },
    { label: 'Created', value: parseDate(createdAt as string) || '-' },
    { label: 'Last updated', value: parseDate(updatedAt as string) || '-' },
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
              { label: 'Age', value: dateOfBirth ? age : '-' },
            ]}
            country={nationality}
            type={IMAGE_TYPE.USER}
          />
          <SectionContainer>
            <TextList data={details} loading={loading} />
          </SectionContainer>
        </>
      )}
      {}
    </>
  );
}
