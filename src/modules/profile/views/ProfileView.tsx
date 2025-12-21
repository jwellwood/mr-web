import { ApolloError } from '@apollo/client';
import { IMAGE_TYPE } from '../../../constants';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader';

import { useDateOfBirth } from '../../../hooks';
import { parseDate } from '../../../utils/helpers';
import { IUser } from '../../auth/types';
import { DataError, SectionContainer } from '../../../components';
import TextList from '../../../components/lists/TextList';

interface Props {
  data?: { user: IUser | null };
  loading: boolean;
  error?: ApolloError;
}

export default function ProfileView({ data, loading, error }: Props) {
  const { image, username, dateOfBirth, nationality, email, createdAt, updatedAt } =
    data?.user || {};
  const { age } = useDateOfBirth(dateOfBirth);

  const details = [
    { label: 'Email', value: email || '-' },
    { label: 'Created', value: parseDate(createdAt) || '-' },
    { label: 'Last updated', value: parseDate(updatedAt) || '-' },
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
              { label: '', value: dateOfBirth ? parseDate(dateOfBirth) : '-' },
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
