module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('crear_recetas')) {
        return next();
    }

    request.session.flash = {
        type: 'warning',
        message: 'No tienes permiso para crear recetas.'
    };
    return response.redirect('/recipes');
};
