import { $ns } from "./ns";

//shortcut for xmlns
export function $xmlns(ns: Record<string, string>) {
    return $ns('xmlns', ns)
}