import { gql } from '@apollo/client';

export const UPDATE_COMPETITION_CONFIGS = gql`
  mutation UPDATE_COMPETITION_CONFIGS(
    $orgId: String!
    $seasonId: String!
    $competitionConfigs: [CompetitionConfigInput!]!
  ) {
    UPDATE_COMPETITION_CONFIGS(
      orgId: $orgId
      seasonId: $seasonId
      data: { competitionConfigs: $competitionConfigs }
    ) {
      _id
    }
  }
`;
