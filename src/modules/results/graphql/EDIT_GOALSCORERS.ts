import { gql } from '@apollo/client';

export const EDIT_GOALSCORERS = gql`
  mutation EDIT_GOALSCORERS($resultId: String!, $data: EditGoalscorersInput!) {
    result: EDIT_GOALSCORERS(resultId: $resultId, data: $data) {
      _id
    }
  }
`;
