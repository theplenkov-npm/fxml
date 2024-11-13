
import { $ns } from './ns';

describe('$ns', () => {
  it('should namespace object keys', () => {
    const input = { name: 'test', value: 123 };
    const expected = { 'prefix:name': 'test', 'prefix:value': 123 };
    expect($ns('prefix', input)).toEqual(expected);
  });

  it('should preserve existing namespaced keys', () => {
    const input = { 'existing:key': 'value', normal: 'test' };
    const expected = { 'existing:key': 'value', 'prefix:normal': 'test' };
    expect($ns('prefix', input)).toEqual(expected);
  });

  it('should handle array input without recursion', () => {
    const input = [{ name: 'test1' }, { name: 'test2' }];
    expect($ns('prefix', input)).toEqual(input);
  });

  it('should handle array input with recursion', () => {
    const input = [{ name: 'test1' }, { name: 'test2' }];
    const expected = [
      { 'prefix:name': 'test1' },
      { 'prefix:name': 'test2' }
    ];
    expect($ns('prefix', input, true)).toEqual(expected);
  });

  it('should handle nested objects with recursion', () => {
    const input = {
      name: 'parent',
      child: {
        name: 'child',
        value: 123
      }
    };
    const expected = {
      'prefix:name': 'parent',
      'prefix:child': {
        'prefix:name': 'child',
        'prefix:value': 123
      }
    };
    expect($ns('prefix', input, true)).toEqual(expected);
  });

  it('should handle empty objects', () => {
    expect($ns('prefix', {})).toEqual({});
  });

  it('should handle empty arrays', () => {
    expect($ns('prefix', [])).toEqual([]);
  });

  it('should handle mixed nested structure with recursion', () => {
    const input = {
      items: [{
        name: 'item1',
        details: { type: 'test' }
      }],
      'existing:config': {
        setting: 'value'
      }
    };
    const expected = {
      'prefix:items': [{
        'prefix:name': 'item1',
        'prefix:details': {
          'prefix:type': 'test'
        }
      }],
      'existing:config': {
        'setting': 'value'
      }
    };
    expect($ns('prefix', input, true)).toEqual(expected);
  });
});
//unit test for $