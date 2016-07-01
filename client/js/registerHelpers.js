$(document).on('ready', function (e) {
	require(['lodash', 'knights-usertitle/helper'], function (_, helper) {
		templates.registerHelper('pickUserTitle', function (data) {
			var groups = data.user.groups || data.userData.groups;
			if (!groups || _.isEmpty(groups)) return helper.guest;

			return helper.wrapUserTitle(helper.sortGroups(groups)[0]);
		});
	});
});
