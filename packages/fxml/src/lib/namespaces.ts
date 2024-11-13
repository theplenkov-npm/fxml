import { $ns } from "./ns";

type NamespaceFunction = <T extends Record<string, any>>(
    object: T,
    recursive?: boolean
) => Record<string, any>

type NamespaceFunctions = Record<string, NamespaceFunction>

type Namespace = string | [string, { recursive?: boolean }]
export type NamespaceInput = Namespace[]

export function $namespaces(namespaces: NamespaceInput): NamespaceFunctions {

    return namespaces.reduce((acc, namespace) => {

        if (Array.isArray(namespace)) {
            const [key, { recursive }] = namespace;
            acc[key] = (object) => $ns(key, object, recursive);
        } else {
            acc[namespace] = (object) => $ns(namespace, object);
        }
        return acc;
    }, {} as NamespaceFunctions);
}

