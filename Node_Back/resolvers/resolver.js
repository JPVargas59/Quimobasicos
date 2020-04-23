const resolver = {
	empleado: {
		__resolveType() {
			return null;
		}
	},
	Query: {
		hello: () => 'world'
	}
};

exports.resolver = resolver;
