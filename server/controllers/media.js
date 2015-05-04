//'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Media = mongoose.model('Media'),
        _ = require('lodash');
var fs = require('fs');

/**
 * Find nedia by id
 */
exports.media = function(req, res, next, id) {
    Media.load(id, function(err, media) {
        if (err)
            return next(err);
        if (!media)
            return next(new Error('Failed to load media ' + id));
        req.media = media;
        next();
    });
};

/**
 * Create an category
 */
exports.create = function(req, res) {
    console.log("SERVER CONTROLLER CREATE");
    var media = new Media(req.body);

    media.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the Media'
            });
        }
        res.json(media);

    });
};

/**
 * Update an media
 */
exports.update = function(req, res) {
    var media = req.media;
    media = _.extend(media, req.body);

    media.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the media'
            });
        }
        res.json(media);

    });
};

/**
 * Delete an category
 */
exports.destroy = function(req, res) {
    var media = req.media;
    fs.unlink("upload/media/" + media.imageName);
    media.remove(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the media'
            });
        }
        res.json(media);

    });
};

/**
 * Show an category
 */
exports.show = function(req, res) {
    res.json(req.media);
};

/**
 * List of media
 */
exports.all = function(req, res) {
    Media.find().sort('-created').exec(function(err, media) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the media'
            });
        }
        res.json(media);
    });
};

/**
 * List of media based on filter
 */
exports.filter = function(req, res) {
    if (req.body.data == 'all') {
        Media.find().sort('-created').exec(function(err, media) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the media'
                });
            }
            res.json(media);
        });
    } else {
        Media.find({mimeType: req.body.data}).sort('-created').exec(function(err, media) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot list the media'
                });
            }
            res.json(media);
        });
    }
};

/**
 * List of search
 */
exports.search = function(req, res) {
    Media.find({$or: [{name: {$regex: req.body.data}}, {description: {$regex: req.body.data}}]}).sort('-created').exec(function(err, media) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the media'
            });
        }
        res.json(media);
    });
};
