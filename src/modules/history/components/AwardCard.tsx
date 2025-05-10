import React from 'react';
import { SectionContainer } from '../../../components/containers';
import { GridItem } from '../../../components/grids';
import { CustomTypography } from '../../../components/typography';
import { IAward } from '../types';

interface Props {
  award: IAward;
}

const AwardCard: React.FC<Props> = ({ award }) => {
  const { awardName, awardValue, winners, comment } = award;
  return (
    <GridItem xs={12}>
      <SectionContainer>
        <CustomTypography color="primary" bold size="xs" div>
          {awardName}
        </CustomTypography>
        {winners.map((winner) => {
          return (
            <CustomTypography key={typeof winner === "object" ? winner._id : winner} color="data" bold size="md" div>
              {typeof winner === "object" ? winner.name : winner}
            </CustomTypography>
          );
        })}
        {awardValue ? (
          <CustomTypography color="label" bold size="xs" div>
            ({awardValue})
          </CustomTypography>
        ) : null}
        {comment && (
          <CustomTypography color="label" bold size="xs" div>
            {comment}
          </CustomTypography>
        )}
      </SectionContainer>
    </GridItem>
  );
};

export default AwardCard;
