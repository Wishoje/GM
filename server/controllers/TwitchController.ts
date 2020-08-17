import * as express from 'express';
import ControllerInterface from '../interfaces/ControllerInterface';
import axios from 'axios'
import TwitchStreamersService from '../services/TwitchStreamersService';

class TwitchController implements ControllerInterface {
	public path = '/api/twitch';
	public router = express.Router();
	private twitchStreamersService = new TwitchStreamersService;
	private kraken = axios.create({
		headers: {
			"Client-ID": process.env.NUXT_ENV_TWITCH_CLIENT_ID,
			Authorization: `Bearer ${process.env.NUXT_ENV_TWITCH_ACCESS_TOKEN}`,
		}
	});

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get([`${this.path}`], this.getTwitchGames);
	}

	private getTwitchGames = async (request: express.Request, response: express.Response) => {
		try {
			const liveStreamers = await this.kraken.get('https://api.twitch.tv/helix/streams?first=22');
			const twitchProfileApi = this.twitchStreamersService.twitchStreamerProfileApi(liveStreamers.data);

			const liveStreamersProfiles = await this.kraken.get(twitchProfileApi);
			const twitchObj = this.twitchStreamersService.twitchStreamerProfile(liveStreamersProfiles.data);
			
			response.send(twitchObj);
		} catch(err) {
            throw new Error(err)
        }
	}
}

export default TwitchController;