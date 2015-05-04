'use strict';

var media = require('../controllers/media');

module.exports = function(Media, app, auth) {

    console.log("SERVER ROUTES");
    app.route('/media')
            .get(media.all)
            .post(media.create);
    app.route('/media/:mediaId')
            .get(auth.isMongoId, media.show)
            .put(auth.isMongoId, media.update)
            .delete(auth.isMongoId, media.destroy);
    app.route('/media/filter/list')
            .post(media.filter);
    app.route('/media/search/list')
            .post(media.search);
    // Finish with setting up the categoryId param
    app.param('mediaId', media.media);
};

/* jshint -W098 */
// The Package is past automatically as first parameter
//module.exports = function(Media, app, auth, database) {
//
//  app.get('/media/example/anyone', function(req, res, next) {
//    res.send('Anyone can access this');
//  });
//
//  app.get('/media/example/auth', auth.requiresLogin, function(req, res, next) {
//    res.send('Only authenticated users can access this');
//  });
//
//  app.get('/media/example/admin', auth.requiresAdmin, function(req, res, next) {
//    res.send('Only users with Admin role can access this');
//  });
//
//  app.get('/media/example/render', function(req, res, next) {
//    Media.render('index', {
//      package: 'media'
//    }, function(err, html) {
//      //Rendering a view from the Package server/views
//      res.send(html);
//    });
//  });
//};
