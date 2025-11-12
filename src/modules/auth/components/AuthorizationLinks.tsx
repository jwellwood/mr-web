import { CenteredGrid, GridItem } from '../../../components/grids';
import { CustomLinkButton } from '../../../components/buttons';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../components/lists/types';

type Props = {
  links: IListItem[];
};

export default function AuthorizationLinks({ links }: Props) {
  return (
    <div style={{ marginTop: '40px' }}>
      <CenteredGrid>
        {links.map(item => (
          <GridItem key={item.link} size={12}>
            <CustomTypography color="label" size="sm">
              {item.label}
            </CustomTypography>
            <CustomLinkButton type="text" color="warning" link={item.link as string}>
              {item.value}
            </CustomLinkButton>
          </GridItem>
        ))}
      </CenteredGrid>
    </div>
  );
}
