import React from 'react';
import { CustomTypography } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { CustomSkeleton } from '../../../components/loaders';

type TextContent = {
  show: boolean;
  first: {
    color: string;
    value: string | React.ReactNode;
  };
  second?: {
    color: string;
    value: string | React.ReactNode;
  };
};

interface Props {
  label: string | React.ReactNode;
  primary: TextContent;
  secondary: TextContent;
  loading?: boolean;
}

export default function StatBox({ label, primary, secondary, loading }: Props) {
  return (
    <>
      <CustomStack direction="column" spacing={1}>
        <CustomTypography color="label" size="xs">
          {label}
        </CustomTypography>
        {loading ? (
          <CustomSkeleton width="60%" height="40px" />
        ) : (
          <CustomTypography bold size="lg" color={primary.first.color}>
            {primary.first.value}
          </CustomTypography>
        )}
        {loading ? (
          <CustomSkeleton width="100%" height="20px" />
        ) : (
          <CustomTypography color="label" size="xs">
            {secondary.show ? (
              <CustomStack divider direction="row" spacing={1}>
                <CustomTypography color={secondary.first.color} size="xs" bold>
                  {secondary.first.value}
                </CustomTypography>
                {secondary.second && (
                  <CustomTypography color={secondary.second.color} size="xs" bold>
                    {secondary.second.value}
                  </CustomTypography>
                )}
              </CustomStack>
            ) : (
              '-'
            )}
          </CustomTypography>
        )}
      </CustomStack>
    </>
  );
}
