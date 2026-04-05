module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('modificar_recetas')) {
        return next();
    }

    request.session.flash = {
        type: 'warning',
        message: 'No tienes permiso para modificar recetas.'
    };
    return response.redirect('/recipes');
};
