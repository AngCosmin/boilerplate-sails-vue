<template>
	<div>
		Hello
	</div>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined

	export default {
		middleware: 'isAuth',
		methods: {
			logout() {
				Cookie.remove('auth')
				this.$store.commit('setAuth', null)
				this.$router.replace('/login')
			}
		}
	}
</script>
