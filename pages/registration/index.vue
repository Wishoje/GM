<template>
	<div>
        <login-register modalType="modalRegister" buttonText="Create Account"/>
    </div>
</template>

<script>
import LoginRegister from '../../components/LoginRegister';

export default {
    name: 'Registration',
    components: {
        LoginRegister
    }
}
</script>