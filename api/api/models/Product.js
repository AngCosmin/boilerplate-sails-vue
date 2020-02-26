module.exports = {
    tableName: 'products',

    attributes: {
        name: { type: 'string', required: true },
        description: { type: 'string', required: false, allowNull: null },
        quantity: { type: 'string', required: false, allowNull: null },

        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

        category: { model: 'category', unique: true }
    }
}
