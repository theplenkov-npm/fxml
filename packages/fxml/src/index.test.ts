import { describe, test, expect } from 'vitest'
import { $attr, $xmlns, $namespaces } from './index'

const { doma, adtcore, atom } = $namespaces([
    ['doma', { recursive: true }],
    'adtcore',
    'atom',
]);

// i used here a real use case of XML i wanted to generate
describe('recursive namespacing', () => {
    test('Construct Fast XML parser compatible XML object with namespaces and attributes', () => {
        const input = {
            ...doma(
                {
                    domain: {
                        ...$attr({
                            ...adtcore({
                                type: 'test',
                                name: 'domain1',
                            }),
                            ...$xmlns({
                                doma: "http://www.sap.com/dictionary/domain",
                                atom: "http://www.w3.org/2005/Atom",
                                adtcore: "http://www.sap.com/adt/core",
                            })
                        }),
                        ...atom({
                            link: [
                                {
                                    ...$attr({
                                        title: 'Historic versions',
                                        rel: 'http://www.sap.com/adt/relations/versions',
                                        href: 'versions',
                                    }),
                                },
                                {
                                    ...$attr({
                                        title: 'Documentation',
                                        type: 'application/vnd.sap.sapgui',
                                        rel: 'http://www.sap.com/adt/relations/documentation',
                                        href: '/sap/bc/adt/vit/docu/object_type/do/object_name/zage_fixed_values',
                                    }),
                                },
                            ],
                        }),
                        content: {
                            typeInfo: true,
                        },
                    },
                }
            ),
        };

        const expected = {
            'doma:domain': {
                '@_adtcore:type': 'test',
                '@_adtcore:name': 'domain1',
                "@_xmlns:doma": "http://www.sap.com/dictionary/domain",
                "@_xmlns:atom": "http://www.w3.org/2005/Atom",
                "@_xmlns:adtcore": "http://www.sap.com/adt/core",
                'atom:link': [
                    {
                        '@_title': 'Historic versions',
                        '@_rel': 'http://www.sap.com/adt/relations/versions',
                        '@_href': 'versions',
                    },
                    {
                        '@_title': 'Documentation',
                        '@_type': 'application/vnd.sap.sapgui',
                        '@_rel': 'http://www.sap.com/adt/relations/documentation',
                        '@_href': '/sap/bc/adt/vit/docu/object_type/do/object_name/zage_fixed_values',
                    },
                ],
                'doma:content': {
                    'doma:typeInfo': true,
                },
            },
        };

        expect(input).toEqual(expected);
    });
});