interface Props {
  rows: number;
}

export default function MatchSkeleton({ rows }: Props) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ color: 'lightblue' }}>
          MatchSkeleton
        </div>
      ))}
    </>
  );
}
