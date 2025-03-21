export type ConnectionTypes = 'Discord' | 'Notion' | 'Slack' | 'GoogleDrive' | 'Gmail' ;

export type Connection = {
    title: ConnectionTypes
    description: string
    connectionKey: string
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
}
