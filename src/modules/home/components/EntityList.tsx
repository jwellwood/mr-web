import { useTranslation } from 'react-i18next';
import { ImageAvatar } from '../../../components/avatars';
import { FlagIcon } from '../../../components/icons';
import { LinksList } from '../../../components/lists';
import { CustomTypography, NoDataText } from '../../../components/typography';
import { IMAGE_TYPE } from '../../../constants';

export interface Entity {
  city: string;
  country: string;
  link: string;
  name: string;
  badge?: string;
}

interface Props {
  entity?: Entity[];
  searchTerm: string;
  loading: boolean;
  type: 'org' | 'team';
}

export default function OrgList({ entity, searchTerm, loading, type }: Props) {
  const { t } = useTranslation('home');
  const isSearchComplete = Array.isArray(entity) && searchTerm.trim().length > 0;
  const links = entity?.length
    ? entity?.map(item => {
        return {
          avatar: <ImageAvatar imageUrl={item.badge} fallbackIcon={IMAGE_TYPE.BADGE} />,
          label: (
            <CustomTypography bold size="sm" color="data">
              {item.name}
            </CustomTypography>
          ),
          secondary: (
            <CustomTypography bold size="sm" color="label">
              {item.city} <FlagIcon nationality={item.country || ''} />
            </CustomTypography>
          ),
          link: item.link,
        };
      })
    : [{ avatar: <></>, label: <></>, secondary: <></> }]; //skeleton item

  return isSearchComplete && !loading && !entity?.length ? (
    <NoDataText>{t(`NOT_FOUND.${type.toUpperCase()}`)}</NoDataText>
  ) : (
    <LinksList links={links} loading={loading} rows={2} />
  );
}
