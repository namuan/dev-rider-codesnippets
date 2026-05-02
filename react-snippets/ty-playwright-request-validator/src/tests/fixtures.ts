import { test as base, type Route, type Request } from '@playwright/test'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface MockApi {
  setPosts(posts: Post[]): void
  setError(status: number, body?: string): void
  readonly requests: Request[]
}

const SAMPLE_POSTS: Post[] = [
  { userId: 1, id: 1, title: 'first post', body: 'body of post one' },
  { userId: 1, id: 2, title: 'second post', body: 'body of post two' },
]

export const test = base.extend<{ mockApi: MockApi }>({
  mockApi: [
    async ({ page }, use) => {
      let posts: Post[] = SAMPLE_POSTS
      let error: { status: number; body: string } | null = null
      const requests: Request[] = []

      await page.route('**/jsonplaceholder.typicode.com/posts', async (route: Route) => {
        const method = route.request().method()
        requests.push(route.request())

        if (error) {
          return route.fulfill({ status: error.status, body: error.body })
        }
        if (method === 'GET') {
          return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(posts) })
        }
        if (method === 'POST') {
          const created = { id: 101, ...route.request().postDataJSON() }
          return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(created) })
        }
        return route.fulfill({ status: 405, body: 'Method not allowed' })
      })

      await page.route('**/jsonplaceholder.typicode.com/posts/*', async (route: Route) => {
        const method = route.request().method()
        requests.push(route.request())

        if (error) {
          return route.fulfill({ status: error.status, body: error.body })
        }
        if (method === 'PUT') {
          const body = { ...route.request().postDataJSON(), id: Number(route.request().url().split('/').pop()) }
          return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
        }
        if (method === 'DELETE') {
          return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
        }
        return route.fulfill({ status: 405, body: 'Method not allowed' })
      })

      await use({
        get requests() { return requests },
        setPosts(newPosts: Post[]) { posts = newPosts },
        setError(status: number, body = 'Error') { error = { status, body } },
      })
    },
    { auto: true },
  ],
})

export function parseBody(r: { postData(): string | null }): unknown {
  const data = r.postData()
  if (!data) throw new Error('Expected non-null postData')
  return JSON.parse(data)
}

export { expect } from '@playwright/test'
