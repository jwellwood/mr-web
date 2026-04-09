import { gql } from '@apollo/client';

export const BATCH_CONFIRM_RESULTS = gql`
  mutation BATCH_CONFIRM_RESULTS($orgId: String!, $resultIds: [String!]!) {
    BATCH_CONFIRM_RESULTS(orgId: $orgId, resultIds: $resultIds) {}
  }
`;
