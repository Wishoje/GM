export default {
    data() {
        return {
            googleLoading: false,
            googleReady: false,
            clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID
        };
    },
    mounted() {
        window.gapiOnLoadCallback = () => {
            window.gapi.load('auth2', () => {
                window.google_auth2 = window.gapi.auth2.init({
                    client_id: this.clientId,
                    fetch_basic_profile: false,
                    scope: 'profile email'
                });
            });
            this.googleReady = true;
        };
        const installGoogleSdkScript = (d, s, id) => {
            if (d.getElementById(id)) {
                this.google_sdk_initialized = true;
                return;
            };
            let fjs = d.getElementsByTagName(s)[0];
            let js = d.createElement(s);
            js.id = id;
            js.src = 'https://apis.google.com/js/platform.js?onload=gapiOnLoadCallback';
            fjs.parentNode.insertBefore(js, fjs)
        };
        installGoogleSdkScript(document, 'script', 'google-jssdk');
    },
    methods: {
        async googleSubmit () {
            try {
                console.log('!this.googleReady :', !this.googleReady);
                if (!this.googleReady) {
                    return;
                }
                this.googleLoading = true;
                const user = await window.google_auth2.signIn();

                console.log("auth-mixin / user: ", user);

                if (user) {
                    const api = await this.$store.dispatch('auth/google', {token: user.wc.access_token ||  user.tc.access_token});
                    if (api) {
                        this.googleLoading = false;
                        this.$router.push('/account');
                    }
                }
            } catch (err) {
                console.log('auth-mixin / err: ', err);
                this.error = 'Something went wrong please try again';
            }
         }
    }
}