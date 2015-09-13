(function (module) {
	var Plugin = {},
		_ = require('lodash'),
		templates = require.main.require('templates.js');

	/**
	 * Change groups' titles to delete *APB* or *GTA* from them
	 * on account.tpl
	 */
	Plugin.changeName = function (data, callback) {
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


	/**
	 * Prepare for pickUserTitle and pickUserGroups
	 */
	var leader = /лидер/gi,
		foreman = /глав/gi,
		officer = /офицер/gi,
		recruiter = /рекрутер/gi,
		knight = /рыцар/gi,
		friend = /соратник/gi,
		guest = 'Горожанин';

	var apb = /APB/g,
		gta = /GTA/g;

	function getWeight (name) {
		if (name.match(leader)) return 100;
		if (name.match(foreman)) return 75;
		if (name.match(officer)) return 60;
		if (name.match(recruiter)) return 55;
		if (name.match(knight)) return 50;
		if (name.match(friend)) return 45;
		if (name.match(guest)) return 0;
		return 0;
	}

	function sortGroups (groups) {
		return _(groups)
			.map(function (group) {
				group.weight = getWeight(group.name);
				return group;
			})
			.sortByOrder(['weight', 'name'], [false, true])
			.value();
	}

	function getPostUserStyle (name) {
		if (name.match(leader)) return 'group-leader';
		if (name.match(foreman)) return 'group-foreman';
		if (name.match(officer)) return 'group-officer';
		if (name.match(recruiter)) return 'group-recruiter';
		if (name.match(knight)) return 'group-knight';
		if (name.match(friend)) return 'group-friend';
		if (name.match(guest)) return 'group-guest';
		return 'group-guest';
	}

	function wrapUserTitle (group) {
		if (void 0 == group) return '';
		var g = group,
			gName = g.userTitle || g.name,
			gIcon = g.icon !== '' ? '<i class="fa ' + g.icon + '"></i> ' : '' ;

		var wrapper = '<a href="/groups/%slug%"><span class="label group-label inline-block" style="background-color: %labelColor%;">%icon%%userTitle%</span></a>'
			.replace(/%slug%/, g.slug)
			.replace(/%labelColor%/, g.labelColor)
			.replace(/%icon%/, gIcon)
			.replace(/%userTitle%/, gName);

		return wrapper;
	}

	function wrapUserGroups (group) {
		if (void 0 == group) return '';
		var g = group,
			gName = g.userTitle || g.name,
			gIcon = g.icon !== '' ? '<i class="fa ' + g.icon + '"></i> ' : '' ;

		var wrapper = '<a href="/groups/%slug%"><span class="label group-label inline-block" style="font-size: 115%; color: %labelColor%;">%icon%%userTitle%</span></a>'
			.replace(/%slug%/, g.slug)
			.replace(/%labelColor%/, g.labelColor)
			.replace(/%icon%/, gIcon)
			.replace(/%userTitle%/, gName);

		return wrapper;
	}


	Plugin.init = function (params, callback) {
		/**
		 * Register plugin in ACP
		 */
		function renderAdmin (req, res, next) {
			res.render('admin/plugins/usertitle', {em: 'net'});
		}
		params.router.get('/admin/plugins/usertitle', params.middleware.admin.buildHeader, renderAdmin);
		params.router.get('/api/admin/plugins/usertitle', renderAdmin);


		/**
		 * Register helpers
		 */
		templates.registerHelper('pickUserPostStyle', function (user) {
			if (user && _.isArray(user)) user = {groups: user};
			if (!user || _.isEmpty(user.groups)) return 'group-guest';
			return user.userPostStyle = getPostUserStyle(_.first(sortGroups(user.groups)).name);
		});

		templates.registerHelper('pickUserGroups', function (groups) {
			if (_.isEmpty(groups)) return guest;

			var apbGroups = [], gtaGroups = [], otherGroups = [];
			groups = sortGroups(groups);

			_.forEach(groups, function (group) {
				if (group.name.match(apb)) apbGroups.push(group);
				else if (group.name.match(gta)) gtaGroups.push(group);
				else otherGroups.push(group);
			});

			return wrapUserGroups(_.first(otherGroups))
				+ wrapUserGroups(_.first(apbGroups))
				+ wrapUserGroups(_.first(gtaGroups));
		});

		templates.registerHelper('pickUserTitle', function (data) {
			var groups = data.user.groups,
				matched;

			if (_.isEmpty(groups)) return guest;

			if (_.any(groups, function (group) {
				if (group.name.match(leader)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else if (_.any(groups, function (group) {
				if (group.name.match(foreman)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else if (_.any(groups, function (group) {
				if (group.name.match(officer)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else if (_.any(groups, function (group) {
				if (group.name.match(recruiter)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else if (_.any(groups, function (group) {
				if (group.name.match(knight)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else if (_.any(groups, function (group) {
				if (group.name.match(friend)) {
					matched = group.name;
					return group.userTitleEnabled;
				}
				return false;
			})) { return wrapUserTitle(_.find(groups, {'name': matched})); }

			else { return guest; }

		});

		callback(null);
	};

	Plugin.admin = function (header, callback) {
		header.plugins.push({
			route: '/plugins/usertitle',
			icon: 'fa-paint-brush',
			name: 'Mega User Title'
		});

		callback(null, header);
	};

	module.exports = Plugin;

})(module);