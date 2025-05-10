import { TypedDocumentNode, gql } from '@apollo/client';
import {ITeam} from "../../../types";
export const UPDATE_TEAM_DETAILS: TypedDocumentNode<{
  team: ITeam;
}> = gql`
  mutation UpdateTeamDetails(
    $teamId: String!
    $teamName: String!
    $yearFounded: String
    $location: String
    $country: String
    $stadiumName: String
    $stadiumLocation: String
    $stadiumCapacity: String
    $stadiumSurface: String
    $homeShirt: String
    $homeShorts: String
    $homeSocks: String
    $awayShirt: String
    $awayShorts: String
    $awaySocks: String
    $kitsBackground: String
    $isActive: Boolean!
  ) {
    updateTeamDetails(
      teamId: $teamId
      data: {
        teamName: $teamName
        yearFounded: $yearFounded
        location: $location
        country: $country
        stadiumName: $stadiumName
        stadiumLocation: $stadiumLocation
        stadiumCapacity: $stadiumCapacity
        stadiumSurface: $stadiumSurface
        homeShirt: $homeShirt
        homeShorts: $homeShorts
        homeSocks: $homeSocks
        awayShirt: $awayShirt
        awayShorts: $awayShorts
        awaySocks: $awaySocks
        kitsBackground: $kitsBackground
        isActive: $isActive
      }
    ) {
      teamName
      yearFounded
      location
      country
      stadiumName
      stadiumLocation
      stadiumSurface
      stadiumCapacity
      homeShirt
      homeShorts
      homeSocks
      awayShirt
      awayShorts
      awaySocks
      kitsBackground
      isActive
    }
  }
`;
