import { $attr } from './attr';

describe('$attr', () => {
    test('adds @_ prefix to all object keys', () => {
        const input = {
            name: 'John',
            age: 30
        };

        const result = $attr(input);

        expect(result).toEqual({
            '@_name': 'John',
            '@_age': 30
        });
    });

    test('handles empty object', () => {
        const input = {};
        const result = $attr(input);
        expect(result).toEqual({});
    });

    test('preserves value types', () => {
        const input = {
            string: 'text',
            number: 42,
            boolean: true,
            array: [1, 2, 3],
            object: { key: 'value' }
        };

        const result = $attr(input);

        expect(result).toEqual({
            '@_string': 'text',
            '@_number': 42,
            '@_boolean': true,
            '@_array': [1, 2, 3],
            '@_object': { key: 'value' }
        });
    });

    test('handles special characters in keys', () => {
        const input = {
            'special-key': 'value',
            'key_with_underscore': 'test',
            'camelCase': 'data'
        };

        const result = $attr(input);

        expect(result).toEqual({
            '@_special-key': 'value',
            '@_key_with_underscore': 'test',
            '@_camelCase': 'data'
        });
    });
});