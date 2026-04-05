module.exports = (request, response, next) => {
    const permissions = request.session.user.privileges || [];

    if (permissions.includes('ver_recetas')) {
        return next();
    }

    request.session.flash = {
        type: 'warning',
        message: 'No tienes permiso para ver recetas.'
    };
    return response.redirect('/');
};
