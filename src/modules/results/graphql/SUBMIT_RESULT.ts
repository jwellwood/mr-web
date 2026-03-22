import { gql } from '@apollo/client';

export const SUBMIT_RESULT = gql`
  mutation SUBMIT_RESULT(
    $resultId: String!
    $isForfeit: Boolean!
    $homeGoals: Int!
    $awayGoals: Int!
  ) {
    result: SUBMIT_RESULT(
      resultId: $resultId
      data: { homeGoals: $homeGoals, awayGoals: $awayGoals, isForfeit: $isForfeit }
    ) {
      _id
    }
  }
`;
