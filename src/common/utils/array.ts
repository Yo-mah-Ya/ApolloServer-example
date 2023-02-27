export const zipIntoObject = <K, V>(keys: K[], values: V[]): (K | V)[][] => {
    const resultLength = keys.length > values.length ? values.length : keys.length;
    const result: (K | V)[][] = [];
    for (let i = 0; i < resultLength; i++) {
        result.push([keys[i], values[i]]);
    }
    return result;
};
