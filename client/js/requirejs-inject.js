(function () {
	// to prevent changing of NodeBB templates
	// inject modules directly to RequireJS config file
	var rjsConfig = requirejs.s.contexts._.config,
		pluginPrefix = 'knights-usertitle/',
		pluginPath = '../../plugins/nodebb-plugin-mega-knights-usertitle/';
	var registerAMD = function (name, path) {
		if (!rjsConfig.paths[pluginPrefix + name])
			rjsConfig.paths[pluginPrefix + name] = pluginPath + path;
	};

	registerAMD('helper', 'js/helper');
})();
