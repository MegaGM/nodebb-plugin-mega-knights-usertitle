(function (module) {
	var Plugin = {},
		_ = require('lodash'),
		templates = require.main.require('templates.js');


	Plugin.transform = function (data, callback) {
		if (data.userData.groups && !_.isEmpty(data.userData.groups)) {
			data.userData.groups.forEach(function (group) {
				group.userTitle = group.name
					.replace(/Лидеры/i, 'Лидер')
					.replace(/Главы/i, 'Глава')
					.replace(/Офицеры/i, 'Офицер')
					.replace(/Рекрутеры/i, 'Рекрутер')
					.replace(/Рыцари/i, 'Рыцарь')
					.replace(/Соратники/i, 'Соратник');
			});
		}

		callback(null, data);
	};

	Plugin.init = function (params, callback) {
		templates.registerHelper('pickUserTitle', function (data) {
			var groups = data.user.groups,
				matched;

			var leader = /лидер/gi,
				foreman = /глав/gi,
				officer = /офицер/gi,
				recruiter = /рекрутер/gi,
				knight = /рыцар/gi,
				friend = /соратник/gi,
				guest = 'Горожанин';

			if (_.isEmpty(groups)) return guest;

			function wrap (matched) {
				var g = _.find(groups, {'name': matched}),
					gName = g.userTitle || g.name,
					gIcon = g.icon !== '' ? '<i class="fa ' + g.icon + '"></i> ' : '' ;

				var wrapper = '<a href="/groups"><span class="label group-label inline-block" style="color: %labelColor%;">%icon%%userTitle%</span></a><br />'
					.replace(/%labelColor%/, g.labelColor)
					.replace(/%icon%/, gIcon)
					.replace(/%userTitle%/, gName);

				return wrapper;
			}

			if (_.any(groups, function (group) {
				if (group.name.match(leader)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else if (_.any(groups, function (group) {
				if (group.name.match(foreman)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else if (_.any(groups, function (group) {
				if (group.name.match(officer)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else if (_.any(groups, function (group) {
				if (group.name.match(recruiter)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else if (_.any(groups, function (group) {
				if (group.name.match(knight)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else if (_.any(groups, function (group) {
				if (group.name.match(friend)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrap(matched); }

			else { return guest; }

		});

		callback(null);
	};

	module.exports = Plugin;

})(module);