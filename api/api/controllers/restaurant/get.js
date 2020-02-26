module.exports = async function (req, res) {
    // let result = await UserRestaurant.find({ user: 1, restaurant: 1 })
    //     .populate('restaurant').populate('user')

    let restaurant = await Restaurant.findOne({ id: req.params.id })
    return res.json(restaurant)
};
