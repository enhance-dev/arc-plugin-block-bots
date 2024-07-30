import { parseStringPromise } from 'xml2js'
import arc from '@architect/functions'

const { airobotstxt } = await arc.tables()

export async function handler () {
  // check the release feed from https://github.com/ai-robots-txt/ai.robots.txt
  const updated = await getFeedUpdated()

  // get the last time we checked
  const result = await airobotstxt.get({
    key: 'updated',
  })

  let lastUpdated = result?.lastUpdated || ''

  // If there is a new release request the updated robots.txt
  if (updated !== lastUpdated) {
    // Get the most up to date robots.txt
    const response = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    const robotsTxt = await response.text(response)

    // If we succeed update the robots.txt and last updated in our DB
    if (robotsTxt) {
      await updateDB({ lastUpdated, robotsTxt })
    }
  }

  return
}

async function getFeedUpdated () {
  const response = await fetch('https://github.com/ai-robots-txt/ai.robots.txt/releases.atom')
  const text = await response.text()
  const result = await parseStringPromise(text)
  const updated = result?.feed?.updated[0] || ''
  return updated
}

async function updateDB ({ lastUpdated, robotsTxt })  {
  await airobotstxt.put({
    key: 'updated',
    lastUpdated,
  })
  await airobotstxt.put({
    key: 'agents',
    robotsTxt,
  })
  return
}
