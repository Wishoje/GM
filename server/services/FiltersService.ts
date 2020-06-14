class FiltersService {
    public getIframe(playlist: string, type: string): string {
        const iframeWidth = type === 'profile' ? 650 : 400;
        if (playlist.indexOf('soundcloud') > -1) {
            const soundcloudLink = playlist.split('src=')[1];
            return soundcloudLink ? `<iframe width="${iframeWidth}" height="400" scrolling="no" frameborder="no" allow="autoplay" src=${soundcloudLink}` : '';
        } else if (playlist.indexOf('open.spotify') > -1) {
            const spotifyLink = playlist.split('/playlist/')[1];
            return spotifyLink ? `<iframe src="https://open.spotify.com/embed/playlist/${spotifyLink}" width="${iframeWidth}" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` : '';
        } else if (playlist.indexOf('music.apple') > -1) {
            const appleLink = playlist.split('/playlist/')[1];
            return appleLink ? `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="400" style="width:${iframeWidth}px;max-width:${iframeWidth}px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/${appleLink}"></iframe>` : '';
        } else if (playlist.indexOf('youtu') > -1) {
            const youtubeLink = playlist.split('?list=')[1];
            return youtubeLink ? `<iframe width="${iframeWidth}" height="400" src="https://www.youtube.com/embed/videoseries?list=${youtubeLink}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : '';
        } else if (playlist.indexOf('music.amazon') > -1){
            const amazonLink = playlist.split('/playlists/')[1];
            return amazonLink ? `<iframe id='AmazonMusicEmbedB088BK6ZG4' src='https://music.amazon.com/embed/${amazonLink}' width='${iframeWidth}px' height='400' style='border:1px solid rgba(0, 0, 0, 0.12);max-width:'></iframe>` : '';
        } else {
            return '';
        }
    }
}

export default FiltersService;