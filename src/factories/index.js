import SchemaResource from './schema.factory';

let module = 'app.factories';

angular.module(module, [])
    .factory('SchemaResource', SchemaResource.getInstance);

export default module;