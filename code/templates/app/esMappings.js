(function (g) {
    var MAPPINGS = [];

    // Example Mapping - Replace
    MAPPINGS.push({
        type: g._config.RECORD_TYPES.REST_HOOK,
        schema: {
            properties: {
                id: {
                    type: 'text'
                },
                createdBy: {
                    type: 'long'
                },
                createdDate: {
                    type: 'date'
                },
                hookUrl: {
                    type: 'keyword'
                },
                type: {
                    type: 'keyword'
                },
                zapId: {
                    type: 'keyword'
                }
            }
        }
    });

    g.MAPPINGS = MAPPINGS;
})(this);