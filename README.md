# @yagisumi/e7ipc-mock

Welcome

[![NPM version][npm-image]][npm-url] [![install size][packagephobia-image]][packagephobia-url] [![DefinitelyTyped][dts-image]][dts-url]  
[![Coverage percentage][coveralls-image]][coveralls-url]

## Installation

```sh
$ npm i @yagisumi/e7ipc-mock
```

## Usage

- javascript

```js
const Mock = require('@yagisumi/e7ipc-mock').Mock;

new Mock();
```

- typescript

```ts
import { Mock } from '@yagisumi/e7ipc-mock'

type MapType<T, U = keyof T> = U extends keyof T ? T[U] : never

interface Requests {
  hello: {
    type: 'hello'
  }
  bye: {
    type: 'bye'
  }
}

type Request = MapType<Requests>

interface Responses {
  ok: {
    type: 'ok'
  }
}

type Response = MapType<Responses>

const mock = new Mock<Request, Response>()

mock.handle(async (_, req) => {
  if (req.type === 'hello') {
    return { type: 'ok' }
  } else if (req.type === 'bye') {
    throw new Error(`Don't say good bye`)
  } else {
    const unreachable: never = req
    throw new Error('unreachable')
  }
})

const res = await mock.invoke({ type: 'hello' }).catch(() => undefined)

```

## License

[MIT License](https://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/@yagisumi/e7ipc-mock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@yagisumi/e7ipc-mock
[packagephobia-image]: https://flat.badgen.net/packagephobia/install/@yagisumi/e7ipc-mock
[packagephobia-url]: https://packagephobia.now.sh/result?p=@yagisumi/e7ipc-mock
[coveralls-image]: https://img.shields.io/coveralls/yagisumi/node-e7ipc-mock.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/yagisumi/node-e7ipc-mock?branch=master
[dts-image]: https://img.shields.io/badge/DefinitelyTyped-.d.ts-blue.svg?style=flat-square
[dts-url]: http://definitelytyped.org
