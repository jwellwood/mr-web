export function mapper<T>(arr: T[], stat: keyof T) {
    return arr.map((elem) => elem[stat]);
}
