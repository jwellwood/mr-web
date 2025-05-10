import StatSkeleton from "../../components/loaders/StatSkeleton.tsx";

export const returnStatAsZero = (value?: number) => {
  if (typeof value === 'number') return value;
  return <StatSkeleton />;
};
