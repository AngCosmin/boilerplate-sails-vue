<template>
	<v-app>
		<v-navigation-drawer permanent expand-on-hover app>
			<v-list>
				<v-list-item class="px-2">
					<v-list-item-avatar>
						<v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
					</v-list-item-avatar>
				</v-list-item>

				<v-list-item link>
					<v-list-item-content>
						<v-list-item-title class="title">{{ name }}</v-list-item-title>
						<v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list nav dense>
				<v-list-item link @click="logout">
					<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<v-container fluid>
				<nuxt />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined

	export default {
		computed: {
			name() {
				return this.$store.state.name
			},
			email() {
				return this.$store.state.email
			},
		},
		data() {
			return {
				items: [
					{ title: 'Dashboard', icon: 'mdi-view-dashboard' },
					{ title: 'Photos', icon: 'mdi-image' },
					{ title: 'About', icon: 'mdi-help-box' }
				]
			}
		},
		methods: {
			logout() {
				Cookie.remove('auth')
				this.$store.commit('logout')
				this.$router.replace('/login')
				this.$axios.setHeader('Authorization', false)
			}
		}
	}
</script>
