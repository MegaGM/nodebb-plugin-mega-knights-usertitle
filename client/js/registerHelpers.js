$(document).on('ready', function (e) {
	require(['plugins/nodebb-plugin-mega-knights-usertitle/js/vendor/lodash.min'], function (_) {
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
	});
});