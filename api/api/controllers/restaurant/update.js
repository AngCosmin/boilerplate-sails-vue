module.exports = async function (req, res) {
    await Restaurant.update({ id: req.param.id }).set(req.body)
    return res.ok()
};
