<template>
	<v-app id="inspire">
		<v-content class="welcome-bg">
			<v-container class="fill-height">
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<div class="text-center mb-5">
							<img src="~/assets/img/logo-white.png" height="50" />
						</div>

						<v-card shaped elevation="24" :loading="isLoading">
							<v-card-text>
								<v-form class="pt-5">
									<v-text-field v-model="email" label="Email" name="email" type="text" />

									<v-text-field v-model="password" label="Password" name="password" type="password" />
								</v-form>

								<v-alert v-if="areCredentialsInvalid" dense outlined type="error">
									Invalid credentials
								</v-alert>
							</v-card-text>

							<v-card-actions>
								<v-container>
									<v-row>
										<v-spacer />
										<v-btn class="pl-5 pr-5" color="primary" outlined rounded @click="login">Login</v-btn>
										<v-spacer />
									</v-row>
									<v-row>
										<v-col>
											<v-btn class="pl-5 pr-5" color="secondary" to="register" text x-small block>Don't have an account?</v-btn>
										</v-col>
										<v-col>
											<v-btn class="pl-5 pr-5" color="secondary" to="register" text x-small block>Forgot password?</v-btn>
										</v-col>
									</v-row>
								</v-container>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	const Cookie = process.client ? require('js-cookie') : undefined

	export default {
		middleware: 'isNotAuth',
		layout: 'basic',
		data: function() {
			return {
				isLoading: false,
				email: '',
				password: '',
				areCredentialsInvalid: false
			}
		},
		methods: {
			login() {
				this.isLoading = true

				this.$axios
					.$post('login', { email: this.email, password: this.password })
					.then(response => {
						this.isLoading = false

						const auth = { accessToken: response.token }
						const name = response.user.name
						const email = response.user.email
						
						Cookie.set('auth', auth)
						Cookie.set('name', name)
						Cookie.set('email', email)

						this.$store.commit('setAuth', { auth, name, email })
						this.$axios.setHeader('Authorization', 'Bearer ' + response.token)

						this.areCredentialsInvalid = false

						this.$router.push('/')
					})
					.catch(err => {
						this.isLoading = false

						if (err.response.status == 400) {
							this.areCredentialsInvalid = true
						}
					})
			}
		}
	}
</script>
