# Async generator module

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=bugs)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=coverage)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=preludejs_async-generator&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=preludejs_async-generator)

A comprehensive utility library for working with asynchronous generators in TypeScript.

## Installation

```bash
npm i -E @prelude/async-generator
```

## Usage

```ts
import * as G from '@prelude/async-generator'
```

## API Reference

- **append**: Appends values from an iterable after the original async iterable values
- **areUnique**: Checks if all values in an async iterable are unique
- **array**: Collects all values from an async iterable into an array
- **assign**: Mutates objects by assigning properties from a function result
- **batch**: Groups values from an async iterable into fixed-size batches
- **cargo**: Accumulates values into dynamic batches based on processing timing
- **compact**: Filters out null and undefined values from an async iterable
- **concat**: Combines multiple async iterables sequentially into a single async generator
- **consume**: Processes all values from an async iterable for side effects
- **count**: Counts elements in an async iterable that satisfy a predicate
- **cycle**: Repeats values from an async iterable a specified number of times
- **every**: Checks if all values in an async iterable satisfy a predicate
- **filter**: Creates a transformer that only yields values passing a predicate test
- **jitter**: Adds random time delays between yielded values
- **map**: Applies a mapping function to each value, with support for concurrency
- **ofInterval**: Creates an async generator that yields timestamps at regular intervals
- **ofIterable**: Converts any synchronous iterable into an async generator
- **ofNext**: Creates an async generator based on a provided next function
- **unwrapIndexed**: Restores original order of values based on their indices
- **pipe**: Composes functions from left to right for serial transformations
- **prepend**: Yields values from an iterable before the original async iterable values
- **range**: Creates an async generator yielding a sequence of numbers
- **reduce**: Reduces values from an async iterable to a single result
- **skip**: Skips the first n values from an async iterable and yields the rest
- **some**: Checks if at least one value in an async iterable satisfies a predicate
- **step**: Yields every nth value from an async iterable
- **take**: Limits the number of values yielded from an async iterable
- **tap**: Applies a side-effect function to each value without changing them
- **window**: Creates sliding windows of values from an async iterable
- **withIndex**: Pairs each value with its sequential index in an object
- **yield**: Creates an async generator that yields a single value once

## License

```
MIT License

Copyright 2021 Mirek Rusin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
