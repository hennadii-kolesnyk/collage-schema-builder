class SchemaResource {
    static getInstance($resource, host) {
        return $resource(`${host}/api/schemas/:id`, {id:'@_id'},
            {
                update: {
                    method: 'PUT'
                },
                reset: {
                    method: 'POST',
                    url: `${host}/api/schemas/reset`,
                }
            }
        );
    }
}

SchemaResource.getInstance.$inject = ['$resource', 'ApiEndpointUrl'];

export default SchemaResource;