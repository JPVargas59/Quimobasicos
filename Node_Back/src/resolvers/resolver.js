const resolver = {
	Empleado: {
		__resolveType() {
			return null;
		}
	},
	Query: {
		hello: () => 'world'
	}
};

exports.resolver = resolver;
