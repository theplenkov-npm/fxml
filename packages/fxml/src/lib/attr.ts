const ATTR_PREFIX = '@_' as const;

type AttrKeys<T> = {
    [K in keyof T as `${typeof ATTR_PREFIX}${string & K}`]: T[K];
};

export function $attr<T extends Record<string, any>>(object: T): AttrKeys<T> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(object)) {
        const attrKey = `${ATTR_PREFIX}${key}`;
        result[attrKey] = value;
    }

    return result as AttrKeys<T>;
}