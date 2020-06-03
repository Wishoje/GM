import UserPosts from '../entities/user_posts.entity';
import UserPostsCategories from '../entities/user_posts_categories.entity';
import { getRepository } from 'typeorm';

class FiltersService {
    private userPostRepository = getRepository(UserPosts);
    private userPostCategoriesRepository = getRepository(UserPostsCategories);
    
    public getIframe(playlist: string, categories: any): string {
           if (categories.category_name === 'SoundCloud') {
               return `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/637658580&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="${playlist}" title="milan kovacevic" target="_blank" style="color: #cccccc; text-decoration: none;">milan kovacevic</a> · <a href="https://soundcloud.com/milan-kovacevic-618554827/test1" title="test1" target="_blank" style="color: #cccccc; text-decoration: none;">test1</a></div>`;
            } else if (categories.category_name === 'Spotify') {
                const spotifyLink = playlist.split('/playlist/')[1];
                return `<iframe src="https://open.spotify.com/embed/playlist/${spotifyLink}" width="400" height="450" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
            } else if (categories.category_name === 'AppleMusic') {
                return `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:400px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="${playlist}"></iframe>`;
            } else if (categories.category_name === 'Youtube') {
                const youtubeLink = playlist.split('?list=')[1];
                return `<iframe width="400" height="450" src="https://www.youtube.com/embed/videoseries?list=${youtubeLink}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else if (categories.category_name === 'AmazonMusic'){
                return `<iframe id='AmazonMusicEmbedB088BK6ZG4' src='${playlist}' width='400px' height='450px' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>`;
            }
    }
}

export default FiltersService;