// userProtected - check permission of resource  access by condition of resource id and session user id
module.exports = [

    {
        pathRegExp: /^\/api\/v1\/users\/\d+\/role$/,
        permissions: [
            {
                userProtected: false,
                role: 'ADMIN',
                methods: [
                    'POST']
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/(actors|movies|genres)\/\d+$/,
        permissions: [
            {
                userProtected: false,
                role: 'ADMIN',
                methods: [
                    'PUT',
                    'DELETE'
                ]
            },
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/(actors|movies|genres)\/\d+\/get-(movies|actors|genres)$/,
        permissions: [
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/(actors|movies|genres)$/,
        permissions: [
            {
                userProtected: false,
                role: 'ADMIN',
                methods: [
                    'POST'
                ]
            },
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users\/\d+\/profile$/,
        permissions: [
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users\/\d+\/reviews\/\d+$/,
        permissions: [
            {
                userProtected: true,
                role: 'USER',
                methods: [
                    'PUT',
                    'DELETE'
                ]
            },
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users\/\d+\/reviews$/,
        permissions: [
            {
                userProtected: true,
                role: 'USER',
                methods: [
                    'POST'
                ]
            },
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users\/\d+$/,
        permissions: [
            {
                userProtected: true,
                role: 'USER',
                methods: [
                    'PUT',
                    'DELETE',
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users$/,
        userOwnResource: false,
        permissions: [
            {
                userProtected: false,
                role: 'ADMIN',
                methods: [
                    'POST',
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/auth$/,
        userOwnResource: false,
        permissions: [
            {
                userProtected: false,
                role: 'ANON',
                methods: [
                    'GET',
                    'POST'
                ]
            }
        ]
    }
];
