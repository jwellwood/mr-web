export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Overwrite<T extends object, K> = Omit<T, keyof K> & K;

export type MakeAllRequired<T> = {
    [P in keyof T]-?: T[P];
};

export type KeysOfType<T, TCondition> = {
    [K in keyof MakeAllRequired<T>]: T[K] extends TCondition
        ? K
        : never;
}[keyof T];