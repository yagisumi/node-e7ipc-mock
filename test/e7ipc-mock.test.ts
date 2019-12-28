import { Mock, Handler } from '@/e7ipc-mock'

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
  error: {
    type: 'error'
  }
}

type Response = MapType<Responses>

const handler: Handler<Request, Response> = async (_, req) => {
  if (req.type === 'hello') {
    return { type: 'ok' }
  } else if (req.type === 'bye') {
    throw new Error(`don't say goodbye`)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unreachable: never = req
    throw new Error('unreachable')
  }
}

describe('Mock', () => {
  test('normal request', async () => {
    const mock = new Mock<Request, Response>()
    mock.handle(handler)

    const r1 = await mock.invoke({ type: 'hello' })
    expect(r1).toEqual({ type: 'ok' })

    const r2 = await mock.invoke({ type: 'bye' }).catch((err) => {
      expect(err).toBeInstanceOf(Error)
      return null
    })
    expect(r2).toBeNull()
  })

  test('register handler twice', () => {
    const mock = new Mock<Request, Response>()
    mock.handle(handler)
    expect(() => {
      mock.handle(handler)
    }).toThrowError()
  })

  test('removeHandler, handleOnce, NoHandler', async () => {
    const mock = new Mock<Request, Response>()
    mock.handle(handler)
    mock.removeHandler()

    const r1 = await mock.invoke({ type: 'hello' }).catch((err) => {
      expect(err).toBeInstanceOf(Error)
      return null
    })
    expect(r1).toBeNull()

    mock.handleOnce(handler)
    const r2 = await mock.invoke({ type: 'hello' })
    expect(r2).toEqual({ type: 'ok' })

    const r3 = await mock.invoke({ type: 'hello' }).catch((err) => {
      expect(err).toBeInstanceOf(Error)
      return null
    })
    expect(r3).toBeNull()
  })
})
