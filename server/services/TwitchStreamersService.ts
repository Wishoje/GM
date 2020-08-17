import * as express from 'express';
import TwitchStreamersInterface from '../interfaces/TwitchStreamersInterface';
import TwitchProfileInterface from '../interfaces/TwitchProfileInterface';

class TwitchStreamersService {
    // GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>...
    public twitchStreamerProfile(twitchApi: any): TwitchProfileInterface {
        const twitchObj = twitchApi.data;

        return twitchObj.map((twitch) => {
            return {
                id: twitch.id,
                displayName: twitch.display_name,
                profileImageUrl: twitch.profile_image_url,
                description: twitch.description
            } as TwitchProfileInterface
        });
    }

    public twitchStreamerProfileApi(twitchApi: any): string {
        const twitchObj = twitchApi.data;

        const apiString = twitchObj.reduce((str, twitch) => {
            return `${str}id=${twitch.user_id}&`;
        });
        return `https://api.twitch.tv/helix/users?${apiString}`
    }

	public twitchStreamersApi(twitchApi: any): TwitchStreamersInterface {
        const twitchObj = twitchApi.data;

        return twitchObj.map((twitch) => {
            return {
                gameId: twitch.game_id,
                title: twitch.title,
                userId: twitch.user_id,
                viewerCount: twitch.viewer_count
            } as TwitchStreamersInterface
        });
    }
}

export default TwitchStreamersService;