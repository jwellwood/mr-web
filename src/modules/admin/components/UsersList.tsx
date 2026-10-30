import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { IListItem } from '../../../components/lists';

interface Props {
  users: IListItem[];
}

export default function UsersList({ users }: Props) {
  const { t } = useTranslation('admin');
  return (
    <SectionContainer title={t('HEADERS.ADMIN_USERS')}>
      <TextList data={users} />
    </SectionContainer>
  );
}
