import { gql } from '@apollo/client';

export const CONFIRM_RESULT = gql`
  mutation CONFIRM_RESULT($resultId: String!, $isConfirmed: Boolean!) {
    result: CONFIRM_RESULT(resultId: $resultId, isConfirmed: $isConfirmed) {
      _id
    }
  }
`;
