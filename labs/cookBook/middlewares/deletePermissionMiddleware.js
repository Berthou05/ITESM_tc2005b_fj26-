module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('borrar_recetas')) {
        return next();
    }

    request.session.error = 'You do not have permission to delete this resource.';
    return response.redirect('/login');
};
