$(document).on('ready', function (e) {
	require(['../../plugins/nodebb-plugin-mega-knights-usertitle/js/lodash.min'], function (_) {
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
					group.weight = getWeight(group.slug);
					return group;
				})
				.orderBy(['weight', 'name'], ['desc', 'asc'])
				.value();
		}

	/**
	 * DEPRECATED or NOT IN USE YET
	 */
	// function getPostUserStyle (name) {
	// 	if (name.match(leader)) return 'group-leader';
	// 	if (name.match(foreman)) return 'group-foreman';
	// 	if (name.match(officer)) return 'group-officer';
	// 	if (name.match(recruiter)) return 'group-recruiter';
	// 	if (name.match(knight)) return 'group-knight';
	// 	if (name.match(friend)) return 'group-friend';
	// 	if (name.match(guest)) return 'group-guest';
	// 	return 'group-guest';
	// }

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

		/**
		 * DEPRECATED or NOT IN USE YET
		 */
		// function wrapUserGroups (group) {
		// 	if (void 0 == group) return '';
		// 	var g = group,
		// 		gName = g.userTitle || g.name,
		// 		gIcon = g.icon !== '' ? '<i class="fa ' + g.icon + '"></i> ' : '' ;
		//
		// 	var wrapper = '<a href="/groups/%slug%"><span class="label group-label inline-block" style="font-size: 115%; color: %labelColor%;">%icon%%userTitle%</span></a>'
		// 		.replace(/%slug%/, g.slug)
		// 		.replace(/%labelColor%/, g.labelColor)
		// 		.replace(/%icon%/, gIcon)
		// 		.replace(/%userTitle%/, gName);
		//
		// 	return wrapper;
		// }


		/**
		 * Register helpers
		 */

		/**
		 * DEPRECATED or NOT IN USE YET
		 */
		// templates.registerHelper('pickUserPostStyle', function (user) {
		// 	console.log('client side pickUserPostStyle', user);
		// 	if (user && _.isArray(user)) user = {groups: user};
		// 	if (!user || _.isEmpty(user.groups)) return 'group-guest';
		// 	return user.userPostStyle = getPostUserStyle(_.first(sortGroups(user.groups)).name);
		// });


		/**
		 * DEPRECATED or NOT IN USE YET
		 */
		// templates.registerHelper('pickUserGroups', function (groups) {
		// 	if (_.isEmpty(groups)) return guest;
		//
		// 	var apbGroups = [], gtaGroups = [], otherGroups = [];
		// 	groups = sortGroups(groups);
		//
		// 	_.forEach(groups, function (group) {
		// 		if (group.name.match(apb)) apbGroups.push(group);
		// 		else if (group.name.match(gta)) gtaGroups.push(group);
		// 		else otherGroups.push(group);
		// 	});
		//
		// 	return wrapUserGroups(_.first(otherGroups))
		// 		+ wrapUserGroups(_.first(apbGroups))
		// 		+ wrapUserGroups(_.first(gtaGroups));
		// });


		templates.registerHelper('pickUserTitle', function (data) {
			var groups = data.user.groups || data.userData.groups;

			if (!groups || _.isEmpty(groups)) return guest;

			return wrapUserTitle(sortGroups(groups)[0]);
		});

	});
});
