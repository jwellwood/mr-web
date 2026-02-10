import { LinkButton } from '../../../components/buttons';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';

interface Props {
  links: IListItem[];
}

export default function AuthorizationLinks({ links }: Props) {
  return (
    <div style={{ marginTop: '40px' }}>
      {links?.map(item => (
        <div key={item.link}>
          <CustomTypography color="label" size="sm">
            {item.label}
          </CustomTypography>
          <LinkButton type="text" color="warning" link={item?.link as string}>
            {item.value}
          </LinkButton>
        </div>
      ))}
    </div>
  );
}
