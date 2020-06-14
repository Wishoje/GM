import UserPostsCategories from '../entities/user_posts_categories.entity';

class FiltersService {
    public getIframe(playlist: string): string {
            if (playlist.indexOf('soundcloud') > -1) {
               return playlist;
            } else if (playlist.indexOf('open.spotify') > -1) {
                const spotifyLink = playlist.split('/playlist/')[1];
                return spotifyLink ? `<iframe src="https://open.spotify.com/embed/playlist/${spotifyLink}" width="400" height="450" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` : '';
            } else if (playlist.indexOf('music.apple') > -1) {
                const appleLink = playlist.split('/playlist/')[1];
                return appleLink ? `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:400px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/${appleLink}"></iframe>` : '';
            } else if (playlist.indexOf('youtube') > -1) {
                const youtubeLink = playlist.split('?list=')[1];
                return youtubeLink ? `<iframe width="400" height="450" src="https://www.youtube.com/embed/videoseries?list=${youtubeLink}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : '';
            } else if (playlist.indexOf('music.amazon') > -1){
                const amazonLink = playlist.split('/playlists/')[1];
                return amazonLink ? `<iframe id='AmazonMusicEmbedB088BK6ZG4' src='https://music.amazon.com/embed/${amazonLink}' width='400px' height='450px' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>` : '';
            }
    }
}

export default FiltersService;