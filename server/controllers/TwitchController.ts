import * as express from 'express';
import ControllerInterface from '../interfaces/ControllerInterface';
import axios from 'axios'

class TwitchController implements ControllerInterface {
	public path = '/api/twitch';
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get([`${this.path}`], this.getTwitchGames);
	}

	private getTwitchGames = async (request: express.Request, response: express.Response) => {
		try {
            const kraken = axios.create({
                headers: {
                    "Client-ID": process.env.NUXT_ENV_TWITCH_CLIENT_ID,
                    Authorization: `Bearer ${process.env.NUXT_ENV_TWITCH_ACCESS_TOKEN}`,
                }
            });
            const result = await kraken.get('https://api.twitch.tv/helix/games/top');
            console.log('DATA ' + result.data);
			response.send(result.data);
		} catch(err) {
            throw new Error(err)
        }
	}
}

export default TwitchController;