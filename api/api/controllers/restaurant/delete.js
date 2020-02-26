module.exports = async function (req, res) {
    await Restaurant.destroy({ id: req.params.id })
    return res.ok()  
};
