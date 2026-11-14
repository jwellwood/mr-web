import { useTranslation } from 'react-i18next';
import { ImageAvatar, NoDataText } from '../../../components';
import { FlagIcon } from '../../../components/icons';
import { IListItem, TextList } from '../../../components/lists';
import { IMAGE_TYPE } from '../../../constants';
import { RequestAdminEntity } from './RequestAdminModal';

interface Props {
  results?: RequestAdminEntity[];
  searchTerm: string;
  searchLoading: boolean;
  type: 'org' | 'team';
  onClick?: (entity: RequestAdminEntity) => void;
}

export default function RenderEntityList({
  results,
  onClick,
  searchTerm,
  searchLoading,
  type,
}: Props) {
  const { t } = useTranslation('admin');
  const listItems: IListItem[] = results
    ? results.map(entity => ({
        avatar: <ImageAvatar imageUrl={entity.badge || ''} fallbackIcon={IMAGE_TYPE.BADGE} />,
        label: entity.name || '',
        secondary: (
          <>
            {entity.city} <FlagIcon nationality={entity.country || ''} />
          </>
        ),
        onClick: onClick ? () => onClick(entity) : undefined,
      }))
    : [];

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
    return <TextList data={listItems} />;
  };

  return <>{renderResults()}</>;
}
