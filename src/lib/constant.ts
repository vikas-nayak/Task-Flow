import { Connection } from '@/lib/types';

export const CONNECTIONS: Connection[] = [
    {
        title: 'GoogleDrive',
        description: 'Connect your google drive to listen to folder changes',
        connectionKey: 'googleNode',
        alwaysTrue: true,
    },
    {
        title: 'Discord',
        description: 'Connect your discord to send notification and messages',
        connectionKey: 'discordNode',
        accessTokenKey: 'webhookURL',
    },
    {
        title: 'Notion',
        description: 'Create entries in your notion dashboard and automate tasks.',
        connectionKey: 'notionNode',
        accessTokenKey: 'accessToken',
    },
    {
        title: 'Slack',
        description:
            'Use slack to send notifications to team members through your own custom bot.',
        connectionKey: 'slackNode',
        accessTokenKey: 'slackAccessToken',
        slackSpecial: true,
    },
    {
        title: 'ChatGPT',
        description:
            'Use slack to send notifications to team members through your own custom bot.',
        connectionKey: 'slackNode',
        accessTokenKey: 'slackAccessToken',
        slackSpecial: true,
    },
]