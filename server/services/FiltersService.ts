import UserPostsLikes from '../entities/user_posts_likes.entity';
import { getRepository, createQueryBuilder } from 'typeorm';
import UserPostsInterface from '../interfaces/UserPostsInterface';


class FiltersService {
    private userPostsLikesRepository = getRepository(UserPostsLikes);

    public getIframe(playlist: string, type: string): string {
        // const iframeWidth = type === 'profile' ? 650 : 400;
        if (playlist.indexOf('soundcloud') > -1) {
            const soundcloudLink = playlist.split('src=')[1];
            return soundcloudLink ? `<iframe width="100%" height="400" scrolling="no" frameborder="no" allow="autoplay" src=${soundcloudLink.split('</iframe>')[0]}` : '';
        } else if (playlist.indexOf('open.spotify') > -1) {
            const spotifyLink = playlist.split('/playlist/')[1];
            return spotifyLink ? `<iframe src="https://open.spotify.com/embed/playlist/${spotifyLink}" width="100%" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` : '';
        } else if (playlist.indexOf('music.apple') > -1) {
            const appleLink = playlist.split('/playlist/')[1];
            return appleLink ? `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="400" style="width:100%;max-width:100%;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/${appleLink}"></iframe>` : '';
        } else if (playlist.indexOf('youtu') > -1) {
            const youtubeLink = playlist.split('?list=')[1];
            return youtubeLink ? `<iframe width="100%" height="400" src="https://www.youtube.com/embed/videoseries?list=${youtubeLink}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : '';
        } else if (playlist.indexOf('music.amazon') > -1){
            const amazonLink = playlist.split('/playlists/')[1];
            return amazonLink ? `<iframe id='AmazonMusicEmbedB088BK6ZG4' src='https://music.amazon.com/embed/${amazonLink}' width='100%' height='400' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>` : '';
        } else {
            return '';
        }
    }

    public getPostLikeCount = async (postId: number) => {
        try {
			const likedPostCount = await this.userPostsLikesRepository.createQueryBuilder("user_posts_likes")
				.innerJoin("user_posts_likes.user", "User")
				.innerJoinAndSelect("user_posts_likes.userpost", "UserPosts")
				.where("UserPosts.id = :id", { id: postId })
                .getCount();

                return likedPostCount;
		} catch (err) {
			throw new Error(err);
		} 
    }
    
    public async iframeDataHelper(categoriesPosts: Array<any>): Promise<Array<any>> {
        try {
            let result = [];
            if (categoriesPosts) {
                result = await Promise.all(categoriesPosts.map(async (categoryPost) => {
                    return {
                        id: categoryPost.id,
                        playlist: this.getIframe(categoryPost.playlist, 'search'),
                        likes: await this.getPostLikeCount(categoryPost.id),
                        shares: categoryPost.shares,
                        UserPostsCategories: categoryPost.userPostsCategories,
                        userName: categoryPost.user && categoryPost.user.name ? categoryPost.user.name : '',
                        userId: categoryPost.user && categoryPost.user.id ? categoryPost.user.id : ''
                    } as UserPostsInterface
                }));
            }
            
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default FiltersService;