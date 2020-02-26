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
									<v-text-field v-model="name" label="Name" name="name" type="text" />
									<v-text-field v-model="email" label="Email" name="email" type="text" />
									<v-text-field v-model="password" label="Password" name="password" type="password" />
								</v-form>

								<v-alert v-if="errorMsg" dense outlined type="error">
									{{ errorMsg }}
								</v-alert>
							</v-card-text>

							<v-card-actions>
								<v-container>
									<v-row>
										<v-spacer />
										<v-btn class="pl-5 pr-5" color="primary" outlined rounded @click="register">Register</v-btn>
										<v-spacer />
									</v-row>
									<v-row>
										<v-col>
											<v-btn class="pl-5 pr-5" color="secondary" to="login" text x-small block>Already have an account?</v-btn>
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
				errorMsg: null,
				name: '',
				email: '',
				password: ''
			}
		},
		methods: {
			register() {
				this.isLoading = true

				this.$axios
					.$post('register', { name: this.name, email: this.email, password: this.password })
					.then(response => {
						this.isLoading = false
						this.$router.push('/login')
					})
					.catch(err => {
						this.isLoading = false

						if (err.response.status == 400) {
							this.errorMsg = err.response.data.message
						}
					})
			}
		}
	}
</script>
