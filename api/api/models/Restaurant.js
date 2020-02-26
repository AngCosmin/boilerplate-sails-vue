module.exports = {
  tableName: 'restaurants',

  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: false, allowNull: null },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    staff: {
      collection: 'User',
      via: 'restaurant',
      through: 'UserRestaurant',
    },
  },
};

