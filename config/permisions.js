module.exports = [
    // /auth
    // /api/v1/users
    // /api/v1/users/1
    // /api/v1/users/1/role
    {
        pathRegExp: /^\/api\/v1\/users\/\d+\/role$/,
        permissions: [
            {
                role: 'ADMIN',
                methods: [
                    'POST']
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users\/\d+$/,
        permissions: [
            {
                role: 'USER',
                methods: [
                    'UPDATE',
                    'PUT',
                    'DELETE'
                ]
            },
            {
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/api\/v1\/users$/,
        permissions: [
            {
                role: 'USER',
                methods: [
                    'POST'
                ]
            },
            {
                role: 'ANON',
                methods: [
                    'GET'
                ]
            }
        ]
    },
    {
        pathRegExp: /^\/auth$/,
        permissions: [
            {
                role: 'ANON',
                methods: [
                    'GET',
                    'POST'
                ]
            }
        ]
    }
];
