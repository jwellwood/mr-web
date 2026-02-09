import { LinkButton } from '../../../components/buttons';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';

interface Props {
  links: IListItem[];
}

export default function AuthorizationLinks({ links }: Props) {
  return (
    <div style={{ marginTop: '40px' }}>
      <CenteredGrid>
        {links?.map(item => (
          <GridItem key={item.link} size={12}>
            <CustomTypography color="label" size="sm">
              {item.label}
            </CustomTypography>
            <LinkButton type="text" color="warning" link={item?.link as string}>
              {item.value}
            </LinkButton>
          </GridItem>
        ))}
      </CenteredGrid>
    </div>
  );
}
