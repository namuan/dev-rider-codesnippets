import { test, expect, parseBody } from './fixtures'

test.describe('App with mocked API', () => {
  test('shows loading then renders posts', async ({ page, mockApi }) => {
    mockApi.setPosts([
      { userId: 1, id: 1, title: 'custom title', body: 'custom body' },
    ])
    await page.goto('/')
    await expect(page.getByText('custom title')).toBeVisible()
    await expect(page.getByText('custom body')).toBeVisible()
  })

  test('shows error state on API failure', async ({ page, mockApi }) => {
    mockApi.setError(500, 'Server Error')
    await page.goto('/')
    await expect(page.getByText(/error/i)).toBeVisible()
  })

  test('POST creates a new post', async ({ page, mockApi }) => {
    await page.goto('/')
    await page.getByPlaceholder('Title').fill('new title')
    await page.getByPlaceholder('Body').fill('new body')
    await page.getByRole('button', { name: /post/i }).click()
    await expect(page.getByText('new title')).toBeVisible()

    const postReqs = mockApi.requests.filter(r => r.method() === 'POST')
    expect(postReqs).toHaveLength(1)
    expect(parseBody(postReqs[0])).toEqual({
      userId: 1,
      title: 'new title',
      body: 'new body',
    })
  })

  test('PUT updates an existing post', async ({ page, mockApi }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'PUT' }).first().click()
    await page.getByPlaceholder('Title').fill('updated title')
    await page.getByRole('button', { name: /update/i }).click()
    await expect(page.getByText('updated title')).toBeVisible()

    const putReqs = mockApi.requests.filter(r => r.method() === 'PUT')
    expect(putReqs).toHaveLength(1)
    expect(parseBody(putReqs[0])).toMatchObject({
      title: 'updated title',
      body: 'body of post one',
    })
  })

  test('DELETE sends the request and shows response', async ({ page, mockApi }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'DELETE' }).first().click()
    await expect(page.locator('.response-log')).toContainText('DELETE')
    await expect(page.locator('.response-log')).toContainText('200')

    const delReqs = mockApi.requests.filter(r => r.method() === 'DELETE')
    expect(delReqs).toHaveLength(1)
  })
})
