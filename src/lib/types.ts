export type ConnectionTypes = 'Discord' | 'Notion' | 'Slack' | 'GoogleDrive' | 'ChatGPT' | 'LinkedIn' | 'Instagram' | 'WhatsApp';

export type Connection = {
    title: ConnectionTypes
    description: string
    connectionKey: string
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
}
