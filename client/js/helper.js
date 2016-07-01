(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['lodash'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('lodash'));
	} else {
		// this plugin has no usage for standard browsers
	}
}(this, function (_) {

	var Helper = {};
	/**
	 * Prepare for pickUserTitle and pickUserGroups
	 */
	var leader = /лидер/gi,
		general = /генерал/gi,
		officer = /офицер/gi,
		recruiter = /рекрутер/gi,
		knight = /рыцар/gi,
		friend = /соратник/gi,
		guest = 'Горожанин';

	var apb = /APB/g,
		gta = /GTA/g;

	function getWeight(name) {
		if (name.match(leader)) return 100;
		if (name.match(general)) return 75;
		if (name.match(officer)) return 60;
		if (name.match(recruiter)) return 55;
		if (name.match(knight)) return 50;
		if (name.match(friend)) return 45;
		if (name.match(guest)) return 0;
		return 0;
	}

	function sortGroups(groups) {
		return _(groups)
			.map(function (group) {
				group.weight = getWeight(group.slug);
				return group;
			})
			.orderBy(['weight', 'name'], ['desc', 'asc'])
			.value();
	}


	function wrapUserTitle(group) {
		if (void 0 == group) return '';
		var g = group,
			gName = g.userTitle || g.name,
			gIcon = g.icon !== '' ? '<i class="fa ' + g.icon + '"></i> ' : '';

		var wrapper = '<a href="/groups/%slug%"><span class="label group-label inline-block" style="background-color: %labelColor%;">%icon%%userTitle%</span></a>'
			.replace(/%slug%/, g.slug)
			.replace(/%labelColor%/, g.labelColor)
			.replace(/%icon%/, gIcon)
			.replace(/%userTitle%/, gName);

		return wrapper;
	}

	Helper.getWeight = getWeight;
	Helper.sortGroups = sortGroups;
	Helper.wrapUserTitle = wrapUserTitle;
	Helper.guest = guest;
	return Helper;

}));
