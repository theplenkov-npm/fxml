import { $xmlns } from './xmlns';

describe('$xmlns', () => {
    it('should namespace object keys with xmlns prefix', () => {
        const input = { svg: 'http://www.w3.org/2000/svg', xhtml: 'http://www.w3.org/1999/xhtml' };
        const expected = { 'xmlns:svg': 'http://www.w3.org/2000/svg', 'xmlns:xhtml': 'http://www.w3.org/1999/xhtml' };
        expect($xmlns(input)).toEqual(expected);
    });

    it('should handle empty namespace definitions', () => {
        expect($xmlns({})).toEqual({});
    });

    it('should handle single namespace definition', () => {
        const input = { xml: 'http://www.w3.org/XML/1998/namespace' };
        const expected = { 'xmlns:xml': 'http://www.w3.org/XML/1998/namespace' };
        expect($xmlns(input)).toEqual(expected);
    });

    it('should preserve namespace values', () => {
        const input = { custom: '', default: 'http://example.com' };
        const expected = { 'xmlns:custom': '', 'xmlns:default': 'http://example.com' };
        expect($xmlns(input)).toEqual(expected);
    });

    it('should handle special characters in namespace names', () => {
        const input = { 'my-ns': 'http://example.com', 'ns_1': 'http://test.com' };
        const expected = { 'xmlns:my-ns': 'http://example.com', 'xmlns:ns_1': 'http://test.com' };
        expect($xmlns(input)).toEqual(expected);
    });
});