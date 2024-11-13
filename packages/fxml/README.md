# Why fxmlp?

This library - is a helper library for constructing XML object compatible with [XMLBuilder](https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/3.XMLBuilder.md) of fast-xml-parser library.

Imagine we need to build XML like this:

```xml
<?xml version="1.0"?>
<doma:domain adtcore:type="test" adtcore:name="domain1" xmlns:doma="http://www.sap.com/dictionary/domain" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:adtcore="http://www.sap.com/adt/core">
  <atom:link title="Historic versions" rel="http://www.sap.com/adt/relations/versions" href="versions"></atom:link>
  <atom:link title="Documentation" type="application/vnd.sap.sapgui" rel="http://www.sap.com/adt/relations/documentation" href="/sap/bc/adt/vit/docu/object_type/do/object_name/zage_fixed_values"></atom:link>
  <doma:content>
    <doma:typeInfo>true</doma:typeInfo>
  </doma:content>
</doma:domain>
```

To build it with fast-xml-parser we need to have JSON like this:

```json
{
  "doma:domain": {
    "@_adtcore:type": "test",
    "@_adtcore:name": "domain1",
    "@_xmlns:doma": "http://www.sap.com/dictionary/domain",
    "@_xmlns:atom": "http://www.w3.org/2005/Atom",
    "@_xmlns:adtcore": "http://www.sap.com/adt/core",
    "atom:link": [
      {
        "@_title": "Historic versions",
        "@_rel": "http://www.sap.com/adt/relations/versions",
        "@_href": "versions"
      },
      {
        "@_title": "Documentation",
        "@_type": "application/vnd.sap.sapgui",
        "@_rel": "http://www.sap.com/adt/relations/documentation",
        "@_href": "/sap/bc/adt/vit/docu/object_type/do/object_name/zage_fixed_values"
      }
    ],
    "doma:content": {
      "doma:typeInfo": true
    }
  }
}
```

So if we want to build such JSON - we have to use these symbols such as @ and right in your code

This library introduces ability to construct same object just by using clean property names:

```ts
import { $attr, $xmlns, $namespaces } from 'fxmlp'

const { doma, adtcore, atom } = $namespaces([
    ['doma', { recursive: true }],
    'adtcore',
    'atom',
]);

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
)
```
