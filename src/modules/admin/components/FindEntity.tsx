import { TApolloError } from '../../../types/apollo';
import SearchForm from '../../home/forms/SearchForm';
import RenderEntityList from './RenderEntityList';

export interface RequestAdminEntity {
  id: string;
  name: string;
  city?: string | null;
  country?: string | null;
  badge?: string | null;
}

interface Props {
  searchTerm: string;
  searchLoading: boolean;
  error?: TApolloError;
  type: 'org' | 'team';
  results?: RequestAdminEntity[];
  setSelected: (entity: RequestAdminEntity) => void;
  handleSearch: ({ teamName }: { teamName: string }) => void;
}

export default function FindEntity({
  searchTerm,
  searchLoading,
  error,
  type,
  results,
  setSelected,
  handleSearch,
}: Props) {
  return (
    <>
      <SearchForm
        defaultValues={{ teamName: searchTerm }}
        onSubmit={handleSearch}
        loading={searchLoading}
        error={error}
        type={type}
      />
      <RenderEntityList
        searchTerm={searchTerm}
        searchLoading={searchLoading}
        results={results}
        type={type}
        onClick={setSelected}
      />
    </>
  );
}
