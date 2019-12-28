import { Handler, Client, Server } from '@yagisumi/e7ipc-types'
export * from '@yagisumi/e7ipc-types'

export class Mock<Req, Res> implements Server<Req, Res>, Client<Req, Res> {
  private handler?: Handler<Req, Res>

  invoke(request: Req): Promise<Res> {
    if (this.handler === undefined) {
      return Promise.reject(new Error('No handler registered'))
    } else {
      return this.handler({}, request)
    }
  }

  handle(listener: Handler<Req, Res>) {
    if (this.handler !== undefined) {
      throw new Error('Attempted to register a second handler')
    }
    this.handler = listener
  }

  handleOnce(listener: Handler<Req, Res>) {
    this.handle((ev, req) => {
      this.removeHandler()
      return listener(ev, req)
    })
  }

  removeHandler() {
    this.handler = undefined
  }
}
