<template>
    <div>
        <loading :active.sync="isLoading"
                :can-cancel="canCancel" 
                :is-full-page="isFullPage" 
                :color="color">
        </loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';

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

<style scoped>
.vld-overlay {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	align-items: center;
	display: none;
	justify-content: center;
	overflow: hidden;
	z-index: 9999;
}

.vld-overlay.is-active {
	display: flex;
}

.vld-overlay.is-full-page {
	z-index: 9999;
	position: fixed;
}

.vld-overlay .vld-background {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	opacity: 0.5;
}

.vld-overlay .vld-icon, .vld-parent {
	position: relative;
}
</style>