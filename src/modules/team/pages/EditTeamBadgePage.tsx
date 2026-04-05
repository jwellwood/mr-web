import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import EditTeamBadgeForm from '../forms/edit-team-badge/EditTeamBadgeForm';
import { T_FETCH_TEAM_QUERY } from '../graphql';

interface Props {
  data?: T_FETCH_TEAM_QUERY;
  onSubmit: (formData: { imageFile: File | null }) => Promise<void>;
  loading: boolean;
  error?: TApolloError;
  imageUrl: string | null;
  removeImage: () => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EditTeamBadgePage({
  onSubmit,
  loading,
  error,
  imageUrl,
  setImageUrl,
  removeImage,
  data,
}: Props) {
  const { t } = useTranslation('team');
  return (
    <PageContainer title={t('PAGES.EDIT_TEAM_BADGE')}>
      <EditTeamBadgeForm
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        imageUrl={imageUrl as string}
        setImageUrl={setImageUrl}
        removeImage={removeImage}
        data={data}
      />
    </PageContainer>
  );
}
