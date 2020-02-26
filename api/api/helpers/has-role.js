var jwt = require('jsonwebtoken')

module.exports = {
	friendlyName: 'Has role',
	description: 'Verify if the user has a certain role.',
	inputs: {
		req: {
			type: 'ref',
			friendlyName: 'Request',
			description: 'A reference to the request object (req).',
			required: true,
		},
		res: {
			type: 'ref',
			friendlyName: 'Response',
			description: 'A reference to the response object (res).',
			required: false,
		},
		role: {
			type: 'string',
			friendlyName: 'Role',
			required: true,
		}
	},
	exits: {
		invalid: { description: 'Something went wrong.' },
		noToken: { description: 'Please login.' },
		noPermission: { description: 'You have no permission to do this.' }
	},
	fn: function (inputs, exits) {
		var req = inputs.req
		var role = inputs.role

		if (req.header('authorization')) {
			var token = req.header('authorization').split('Bearer ')[1]

			if (!token) {
				return exits.noToken()
			}

			return jwt.verify(token, process.env.APP_KEY, async function (err, payload) {
				if (err || !payload.id) {
					return exits.invalid()
				}

				var user = await User.findOne(payload.id)

				if (!user) {
					return exits.invalid()
				}

				req.user = user

				let result = await UserRestaurant.findOne({
					user: user.id,
					restaurant: req.params.id,
					role: role
				})

				if (result == null) {
					return exits.noPermission()
				}

				return exits.success(user)
			})
		}

		return exits.noToken()
	}
}