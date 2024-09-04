import db from "@/lib/db";
import { DiscordWebhook } from '@prisma/client';


export async function createDiscordWebhook(data: {
    webhookId: string;
    url: string;
    name: string;
    guildName: string;
    guildId: string;
    channelId: string;
    userId: string;
}) {
    try {
        const webhook = await db.discordWebhook.create({
            data: {
                webhookId: data.webhookId,
                url: data.url,
                name: data.name,
                guildName: data.guildName,
                guildId: data.guildId,
                channelId: data.channelId,
                userId: data.userId,
            },
        });
        return webhook;
    } catch (error) {
        console.error('Error creating Discord webhook:', error);
        throw error;
    }
}

export async function getUserDiscordWebhooks(userId: string) {
    try {
        const webhooks = await db.discordWebhook.findMany({
            where: { userId },
        });
        return webhooks;
    } catch (error) {
        console.error('Error fetching Discord webhooks:', error);
        throw error;
    }
}


export async function sendMessageToStoredWebhook(webhookId: string, message: string) {
    try {
        const webhook = await db.discordWebhook.findUnique({
            where: { webhookId },
        });

        if (!webhook) {
            throw new Error('Webhook not found');
        }

        await fetch(webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: message,
            }),
        });

        console.log('Message sent to Discord');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}


export async function updateDiscordWebhook(webhookId: string, updateData: Partial<DiscordWebhook>) {
    try {
        const updatedWebhook = await db.discordWebhook.update({
            where: { webhookId },
            data: updateData,
        });
        return updatedWebhook;
    } catch (error) {
        console.error('Error updating Discord webhook:', error);
        throw error;
    }
}


export async function deleteDiscordWebhook(webhookId: string) {
    try {
        await db.discordWebhook.delete({
            where: { webhookId },
        });
        console.log('Webhook deleted');
    } catch (error) {
        console.error('Error deleting Discord webhook:', error);
        throw error;
    }
}

