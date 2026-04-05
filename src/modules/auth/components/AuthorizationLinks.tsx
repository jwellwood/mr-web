import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../components/buttons';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';

interface Props {
  links: IListItem[];
}

export default function AuthorizationLinks({ links }: Props) {
  const { t } = useTranslation('auth');
  return (
    <div style={{ marginTop: '40px' }}>
      {links?.map(item => (
        <div key={item.link}>
          <CustomTypography color="label" size="sm">
            {t(item.label as string)}
          </CustomTypography>
          <CustomButton variant="text" color="warning" link={item?.link as string}>
            {t(item.value as string)}
          </CustomButton>
        </div>
      ))}
    </div>
  );
}
