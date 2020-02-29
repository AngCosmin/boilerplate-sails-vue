/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
	'/': { view: 'pages/homepage' },
	'POST /login': { action: 'auth/login' },
	'POST /register': { action: 'auth/register' },

	/***************************************************************************
	 *                                                                          *
	 * RESTAURANT                                                               *
	 *                                                                          *
	 ***************************************************************************/
	'GET /restaurant': { action: 'restaurant/get' },
	'POST /restaurant': { action: 'restaurant/create' },
	'PUT /restaurant/:id': { action: 'restaurant/update' },
	'DELETE /restaurant/:id': { action: 'restaurant/delete' }
}
