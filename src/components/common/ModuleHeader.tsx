import React, { Fragment } from 'react';
import { IMAGE_TYPE } from 'app/constants';
import { SectionContainer } from '../containers';
import { CenteredGrid, GridItem } from '../grids';
import FlagIcon from '../icons/FlagIcon';
import CircularImage from '../images/CircularImage';
import CustomSkeleton from '../loaders/CustomSkeleton';
import { CustomTypography } from '../typography';
import { useNationality } from 'hooks';
import { theme } from 'theme';

type Props = {
  title: string;
  badge: string;
  data?: { label: string; value: any }[];
  city?: string;
  country: string;
  type: IMAGE_TYPE;
  loading?: boolean;
};

const ModuleHeader: React.FC<Props> = ({
  title,
  badge,
  data,
  city,
  country,
  type,
  loading,
}) => {
  const { countryName } = useNationality(country);

  return (
    <SectionContainer>
      <CenteredGrid dir="row">
        <GridItem xs={4}>
          {loading ? (
            <CustomSkeleton
              variant="circular"
              height="90px"
              width="90px"
              margin="8px"
            />
          ) : (
            <CircularImage image={badge} type={type} size="90px" />
          )}
        </GridItem>
        <GridItem xs={8} textAlign="left">
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
                {countryName} <FlagIcon nationality={country} />
              </div>
            )}
          </CustomTypography>
          <div style={{ display: 'flex' }}>
            {data?.map((item, i) => {
              return (
                <Fragment key={item.label + i}>
                  {loading ? (
                    <CustomSkeleton
                      width="30px"
                      height="24px"
                      margin="0px 2px 0px 0px"
                    />
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
    </SectionContainer>
  );
};

export default ModuleHeader;
