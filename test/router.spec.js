import Router from '../src/router.js'

describe('Router', () => {
  it('Counts views', () => {
    let count = 1
    const r = new Router()

    r.push('/foo')
    expect(r.viewCount).toBe(++count)

    r.push('/bar')
    expect(r.viewCount).toBe(++count)

    r.go(-1)
    expect(r.viewCount).toBe(--count)
  })
})
