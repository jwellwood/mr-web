import { TypedDocumentNode, gql } from '@apollo/client';
import { IAward } from '../../types';

export const DELETE_AWARD: TypedDocumentNode<{
  award: IAward;
}> = gql`
  mutation DeleteAward($teamId: String!, $awardId: String!) {
    award: deleteAward(teamId: $teamId, awardId: $awardId) {
      _id
    }
  }
`;
