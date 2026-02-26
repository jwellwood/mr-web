import { gql } from '@apollo/client';

export const UPDATE_COMPETITION_CONFIGS = gql`
  mutation UPDATE_COMPETITION_CONFIGS(
    $orgId: String!
    $seasonId: String!
    $competitionId: String!
    $rounds: Float
    $splitIndexes: [Float!]
    $relegationPositions: [Float!]
    $promotionPositions: [Float!]
    $priority: Float
  ) {
    UPDATE_COMPETITION_CONFIGS(
      orgId: $orgId
      seasonId: $seasonId
      data: {
        competitionConfigs: {
          competitionId: $competitionId
          rounds: $rounds
          splitIndexes: $splitIndexes
          relegationPositions: $relegationPositions
          promotionPositions: $promotionPositions
          priority: $priority
        }
      }
    ) {
      _id
    }
  }
`;
