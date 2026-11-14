import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, SectionContainer } from '../../../components';
import { FormModal } from '../../../components/modals';
import { TApolloError } from '../../../types/apollo';
import RequestAccessForm from '../forms/request-admin-access/RequestAccessForm';
import { RequestAccessData } from '../forms/request-admin-access/schema';
import FindEntity from './FindEntity';
import RenderEntityList from './RenderEntityList';

export interface RequestAdminEntity {
  id: string;
  name: string;
  city?: string | null;
  country?: string | null;
  badge?: string | null;
}

interface Props {
  type: 'org' | 'team';
  results?: RequestAdminEntity[];
  searchLoading: boolean;
  searchError?: TApolloError;
  submitLoading: boolean;
  onSearch: (filter: string) => void;
  // Resolves true when access was granted, which closes the modal
  onSubmit: (id: string, code: string) => Promise<boolean>;
}

export default function RequestAdminModal({
  type,
  results,
  searchLoading,
  searchError,
  submitLoading,
  onSearch,
  onSubmit,
}: Props) {
  const { t } = useTranslation('admin');
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<RequestAdminEntity | null>(null);

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setSearchTerm('');
  };

  const handleSearch = ({ teamName }: { teamName: string }) => {
    setSearchTerm(teamName);
    onSearch(teamName.trim());
  };

  const handleSubmit = async ({ accessCode }: RequestAccessData) => {
    if (selected && (await onSubmit(selected.id, accessCode))) {
      handleClose();
    }
  };

  return (
    <>
      <CustomButton variant="contained" color="primary" onClick={() => setOpen(true)}>
        {t(type === 'org' ? 'BUTTONS.JOIN_ORG' : 'BUTTONS.JOIN_TEAM')}
      </CustomButton>
      <FormModal
        open={open}
        onClose={handleClose}
        title={t(
          type === 'org' ? 'HEADERS.REQUEST_ORG_ADMIN_ACCESS' : 'HEADERS.REQUEST_TEAM_ADMIN_ACCESS'
        )}
      >
        <SectionContainer>
          {selected ? (
            <>
              <SectionContainer
                title={t(type === 'org' ? 'FORM.CHECKLIST.STEP_1_ORG' : 'FORM.CHECKLIST.STEP_1')}
              >
                <RenderEntityList
                  results={results}
                  searchTerm={searchTerm}
                  searchLoading={searchLoading}
                  type={type}
                />
              </SectionContainer>
              <SectionContainer title={t('FORM.CHECKLIST.STEP_2')}>
                <RequestAccessForm
                  type={type}
                  defaultValues={{ accessCode: '' }}
                  onSubmit={handleSubmit}
                  loading={submitLoading}
                />
              </SectionContainer>
            </>
          ) : (
            <SectionContainer
              title={t(type === 'org' ? 'FORM.CHECKLIST.STEP_1_ORG' : 'FORM.CHECKLIST.STEP_1')}
            >
              <FindEntity
                searchTerm={searchTerm}
                searchLoading={searchLoading}
                error={searchError}
                type={type}
                results={results}
                setSelected={setSelected}
                handleSearch={handleSearch}
              />
            </SectionContainer>
          )}
        </SectionContainer>
      </FormModal>
    </>
  );
}
