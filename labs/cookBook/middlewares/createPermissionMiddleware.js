module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('crear_recetas')) {
        return next();
    }

    request.session.error = 'You do not have permission to create recipies.';
    return response.redirect('/users/login');
};
