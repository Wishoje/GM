<template>
    <div>
        <loading :active.sync="isLoading" :can-cancel="canCancel" :is-full-page="isFullPage" :color="color"></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    name: 'Spinner',
    components: {
		Loading
	},
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        canCancel: {
            type: Boolean,
            default: true
        },
        isFullPage: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: '#f01f28'
        }
    }
};
</script>
