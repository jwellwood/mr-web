type MutationFn = (...args: unknown[]) => Promise<unknown>;

type Impl = (
  gql?: unknown,
  options?: { onError?: (err: { message?: string }) => void }
) => [MutationFn, { loading?: boolean }];

let impl: Impl = (_gql?, options?) => {
  options?.onError?.({ message: 'Default mocked error' });
  return [(async () => undefined) as MutationFn, { loading: false }];
};

export const setUseMutationImpl = (fn: Impl) => {
  impl = fn;
};

export const resetUseMutationImpl = () => {
  impl = (_gql?, options?) => {
    options?.onError?.({ message: 'Default mocked error' });
    return [(async () => undefined) as MutationFn, { loading: false }];
  };
};

// Expose an invoker so test setup can register the module-level mock centrally.
export const invokeImpl = (
  gql?: unknown,
  options?: { onError?: (err: { message?: string }) => void } | undefined
) => impl(gql, options);

export default null as unknown as void;
