import arc from '@architect/functions'
import { readFileSync } from 'node:fs'

const { airobotstxt } = await arc.tables()

async function get () {
  // Do we have an updated robots.txt in the DB?
  let result = await airobotstxt.get({
    key: 'agents',
  })
  let robots = result?.robotsTxt || ''

  // If not, serve the default robots.txt
  if (!robots) {
    robots = readFileSync('./default-robots.txt', 'utf-8')
  }

  return {
    // cache for 1 day
    headers: { 'Cache-Control': 'public, max-age=86400' },
    text: robots.trim(),
  }
}

export const handler = arc.http(get)
