module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('modificar_recetas')) {
        return next();
    }

    request.session.error = 'You do not have permission to modify this resource.';
    return response.redirect('/login');
};
