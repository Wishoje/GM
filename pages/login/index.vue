<template>
	<div>
        <login-register modalType="modalLogin" buttonText="Login"/>
    </div>
</template>

<script>
import LoginRegister from '../../components/LoginRegister';

export default {
    name: 'Login',
    components: {
        LoginRegister
    }
}
</script>