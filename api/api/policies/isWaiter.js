module.exports = async function isWaiter(req, res, next) {
    await sails.helpers.hasRole.with({ req: req, role: 'waiter' }).switch({
        error: function(err) {
            return res.serverError(err);
        },
        invalid: function(err) {
            return res.status(401).json({ message: 'There was an error.' });
        },
        noToken: function(err) {
            return res.status(401).json({ message: 'Please login.' });
        },
        noPermission: function(err) {
            return res.status(401).json({ message: 'You don\'t have permission.' });
        },
        success: async function() {
            return next();
        }
    })
};
