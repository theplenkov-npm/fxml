export function $ns(ns: string, object: any, recursive?: boolean) {

    if (Array.isArray(object)) {
        return object.map((item): any => recursive ? $ns(ns, item, recursive) : item)
    }

    const result: Record<string, any> = {}

    for (const [key, value] of Object.entries(object)) {
        const isAlreadyNamespaced = key.includes(':')
        const namespacedKey = isAlreadyNamespaced ? key : `${ns}:${key}`

        result[namespacedKey] = (recursive && !isAlreadyNamespaced && typeof value === 'object') ?
            $ns(ns, value, recursive) :
            value
    }

    return result
}
