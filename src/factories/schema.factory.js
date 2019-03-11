class SchemaResource {
    static getInstance($resource) {
        return $resource('https://mycommunityprint.local/api/schemas/:id', {id:'@_id'},
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    }
}

SchemaResource.getInstance.$inject = ['$resource'];

export default SchemaResource;