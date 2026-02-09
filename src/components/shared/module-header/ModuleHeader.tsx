import React, { Fragment, ReactNode } from 'react';
import { useNationality } from '../../../hooks';
import { theme } from '../../../theme';
import ImageAvatar from '../../avatars/image-avatar/ImageAvatar';
import { ModuleHeaderContainer } from '../../containers';
import { CenteredGrid, GridItem } from '../../grids';
import { AppIconType, FlagIcon } from '../../icons';
import CustomSkeleton from '../../loaders/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  title?: string;
  badge?: string;
  data?: { label: string; value: ReactNode }[];
  city?: string | null;
  country?: string | null;
  type?: AppIconType;
  loading?: boolean;
}

const ModuleHeader: React.FC<Props> = ({ title, badge, data, city, country, type, loading }) => {
  const { countryName } = useNationality(country ?? undefined);

  return (
    <ModuleHeaderContainer>
      <CenteredGrid dir="row">
        <GridItem size={4}>
          <ImageAvatar
            imageUrl={badge}
            fallbackIcon={type}
            size="90px"
            iconSize="65px"
            loading={loading}
            centered
          />
        </GridItem>
        <GridItem size={8} textAlign="left">
          <CustomTypography size="lg" bold color="data">
            {loading ? <CustomSkeleton height="32px" /> : title}
          </CustomTypography>

          <CustomTypography size="xs" bold color="label">
            {loading ? (
              <CustomSkeleton height="18px" width="100px" margin="2px 0px" />
            ) : (
              <div>
                {city && city}
                {city && ', '}
                {countryName} <FlagIcon nationality={country || ''} />
              </div>
            )}
          </CustomTypography>
          <div style={{ display: 'flex' }}>
            {data?.map((item, i) => {
              return (
                <Fragment key={item.label + i}>
                  {loading ? (
                    <CustomSkeleton width="30px" height="24px" margin="0px 2px 0px 0px" />
                  ) : (
                    <div
                      style={{
                        marginRight: '2px',
                        borderRadius: '4px',
                        padding: '0px 4px',
                        background: theme.palette.secondary.main,
                      }}
                    >
                      <CustomTypography size="xs" bold color="label">
                        {item.label} {item.value}
                      </CustomTypography>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </GridItem>
      </CenteredGrid>
    </ModuleHeaderContainer>
  );
};

export default ModuleHeader;
