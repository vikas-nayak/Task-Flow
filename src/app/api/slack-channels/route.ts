import { NextResponse } from 'next/server'
import { getSlackConnection, listBotChannels } from '@/app/(main)/(pages)/dashboard/connections/_actions/slack-connection'

export const GET = async () => {
  try {
    const slackConnection = await getSlackConnection()

    if (!slackConnection) {
      return NextResponse.json({ error: 'Slack connection not found' }, { status: 404 })
    }

    const slackAccessToken = slackConnection.slackAccessToken

    const channels = await listBotChannels(slackAccessToken)

    return NextResponse.json({ channels }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Slack channels' }, { status: 500 })
  }
}
