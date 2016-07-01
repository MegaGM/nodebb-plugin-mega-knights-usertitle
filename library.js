(function (module) {
	'use strict';
	let Plugin = {},
		_ = require('lodash'),
		helper = require('./client/js/helper'),
		groups = require.main.require('./src/groups'),
		templates = require.main.require('templates.js');

	/**
	 * Modify of add some info to users' objects inside Posts array
	 */
	Plugin.modifyUserInfo = (user, callback) => {
		user.uid = parseInt(user.uid, 10);
		groups.getUserGroups([user.uid], function (err, userGroups) {
			if (!err && userGroups && !_.isEmpty(userGroups)) {
				user.groups = userGroups[0];
			} else {
				user.groups = [];
			}
			callback(err, user);
		});
	};

	Plugin.init = function (params, callback) {
		/**
		 * Register helpers
		 */
		templates.registerHelper('pickUserTitle', function (data) {
			var groups = data.user.groups || data.userData.groups;
			if (!groups || _.isEmpty(groups)) return helper.guest;

			return helper.wrapUserTitle(helper.sortGroups(groups)[0]);
		});

		callback(null);
	};

	module.exports = Plugin;

})(module);

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
