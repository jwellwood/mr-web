import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, ImageAvatar, NoDataText } from '../../../components';
import { FlagIcon } from '../../../components/icons';
import { FormModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { IMAGE_TYPE } from '../../../constants';
import { TApolloError } from '../../../types/apollo';
import SearchForm from '../../home/forms/SearchForm';
import RequestAccessForm from '../forms/request-admin-access/RequestAccessForm';
import { RequestAccessData } from '../forms/request-admin-access/schema';

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

  const renderEntity = (entity: RequestAdminEntity, onClick?: () => void) => {
    const content = (
      <>
        <ListItemAvatar>
          <ImageAvatar imageUrl={entity.badge ?? undefined} fallbackIcon={IMAGE_TYPE.BADGE} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <CustomTypography bold size="sm" color="data">
              {entity.name}
            </CustomTypography>
          }
          secondary={
            <CustomTypography bold size="sm" color="label">
              {entity.city} <FlagIcon nationality={entity.country || ''} />
            </CustomTypography>
          }
          slotProps={{ secondary: { component: 'div' } }}
        />
      </>
    );

    return (
      <ListItem key={entity.id} disablePadding>
        {onClick ? (
          <ListItemButton onClick={onClick}>{content}</ListItemButton>
        ) : (
          <ListItemButton disableRipple sx={{ cursor: 'default' }}>
            {content}
          </ListItemButton>
        )}
      </ListItem>
    );
  };

  const renderResults = () => {
    if (!searchTerm.trim() || searchLoading || !results) {
      return null;
    }
    if (!results.length) {
      return (
        <NoDataText>
          {t(
            type === 'org'
              ? 'FORM.REQUEST_ACCESS.NOT_FOUND_ORG'
              : 'FORM.REQUEST_ACCESS.NOT_FOUND_TEAM'
          )}
        </NoDataText>
      );
    }
    return (
      <List dense>{results.map(entity => renderEntity(entity, () => setSelected(entity)))}</List>
    );
  };

  return (
    <>
      <CustomButton variant="text" color="primary" onClick={() => setOpen(true)}>
        {t(type === 'org' ? 'BUTTONS.JOIN_ORG' : 'BUTTONS.JOIN_TEAM')}
      </CustomButton>
      <FormModal open={open} onClose={handleClose} title={t('HEADERS.REQUEST_ADMIN_ACCESS')}>
        {selected ? (
          <>
            <List dense>{renderEntity(selected)}</List>
            <CustomButton variant="text" color="tertiary" onClick={() => setSelected(null)}>
              {t('FORM.REQUEST_ACCESS.CHANGE')}
            </CustomButton>
            <RequestAccessForm
              type={type}
              defaultValues={{ accessCode: '' }}
              onSubmit={handleSubmit}
              loading={submitLoading}
            />
          </>
        ) : (
          <>
            <SearchForm
              defaultValues={{ teamName: searchTerm }}
              onSubmit={handleSearch}
              loading={searchLoading}
              error={searchError}
              type={type}
            />
            {renderResults()}
          </>
        )}
      </FormModal>
    </>
  );
}
