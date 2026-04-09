import { gql } from '@apollo/client';

export const ADD_GOALSCORERS = gql`
  mutation ADD_GOALSCORERS($resultId: String!, $data: AddGoalscorersInput!) {
    result: ADD_GOALSCORERS(resultId: $resultId, data: $data) {
      _id
    }
  }
`;
