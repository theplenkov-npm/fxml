import { $namespaces, NamespaceInput } from './namespaces';
import { $ns } from './ns';

describe('$namespaces', () => {
    test('creates namespace functions for string array input', () => {
        const input = ['ns1', 'ns2', 'ns3'];
        const result = $namespaces(input);

        expect(typeof result['ns1']).toBe('function');
        expect(typeof result['ns2']).toBe('function');
        expect(typeof result['ns3']).toBe('function');

        const testObj = { key: 'value' };
        expect(result['ns1'](testObj)).toEqual($ns('ns1', testObj));
    });

    test('creates namespace functions with recursive option', () => {
        const input: NamespaceInput = [
            ['xmlns', { recursive: true }],
            ['soap', { recursive: false }]
        ];
        const result = $namespaces(input);

        expect(typeof result['xmlns']).toBe('function');
        expect(typeof result['soap']).toBe('function');

        const testObj = { nested: { key: 'value' } };
        expect(result['xmlns'](testObj)).toEqual($ns('xmlns', testObj, true));
        expect(result['soap'](testObj)).toEqual($ns('soap', testObj, false));
    });
    test('handles mixed string and tuple inputs', () => {
        const input: NamespaceInput = [
            'simple',
            ['complex', { recursive: true }]
        ];
        const result = $namespaces(input);

        expect(typeof result['simple']).toBe('function');
        expect(typeof result['complex']).toBe('function');

        const testObj = { key: 'value' };
        expect(result['simple'](testObj)).toEqual($ns('simple', testObj));
        expect(result['complex'](testObj)).toEqual($ns('complex', testObj, true));
    });

    test('returns empty object for empty array input', () => {
        const input: Array<string | [string, { recursive?: boolean }]> = [];
        const result = $namespaces(input);

        expect(result).toEqual({});
    });

    test('handles multiple namespaces with same recursive option', () => {
        const input: NamespaceInput = [
            ['ns1', { recursive: true }],
            ['ns2', { recursive: true }]
        ];
        const result = $namespaces(input);

        const testObj = { nested: { key: 'value' } };
        expect(result['ns1'](testObj)).toEqual($ns('ns1', testObj, true));
        expect(result['ns2'](testObj)).toEqual($ns('ns2', testObj, true));
    });
})
