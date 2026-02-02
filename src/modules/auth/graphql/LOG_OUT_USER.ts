import { gql } from '@apollo/client';

export const LOG_OUT_USER = gql`
  mutation LOG_OUT_USER {
    user: LOG_OUT_USER {
      _id
    }
  }
`;
