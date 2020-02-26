module.exports = {
  tableName: 'user_restaurant',

  attributes: {
    user: { model: 'user' },
    restaurant: { model: 'restaurant' },
    role: { type: 'string', defaultsTo: 'Admin' }
  },
};

