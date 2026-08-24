import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../buttons';
import { TColor } from '../../buttons/types';
import { SectionContainer } from '../../containers';
import { type IListItem } from '../../lists';
import BottomDrawer from '../bottom-drawer/BottomDrawer';

interface Props {
  data: IListItem[];
  title?: string | ReactNode;
}

export default function EditLinksModal({ data, title }: Props) {
  const { t } = useTranslation('components');
  const addLinks = data.filter(item => item.type === 'add');
  const editLinks = data.filter(item => item.type === 'edit');

  const sections = [
    { type: 'add', links: addLinks, color: 'primary' },
    { type: 'edit', links: editLinks, color: 'warning' },
  ];

  return (
    <BottomDrawer
      title={title}
      buttonElement={<CustomButton color="tertiary">{t('MENU.ADMIN')}</CustomButton>}
    >
      <>
        {sections.map(
          section =>
            section.links.length > 0 && (
              <SectionContainer
                key={section.color}
                type={section.type === 'add' ? 'success' : 'warning'}
              >
                {section.links.map(link => (
                  <div key={link.link}>
                    <CustomButton link={link.link} variant="text" color={section.color as TColor}>
                      {link.label}
                    </CustomButton>
                  </div>
                ))}
              </SectionContainer>
            )
        )}
      </>
    </BottomDrawer>
  );
}
