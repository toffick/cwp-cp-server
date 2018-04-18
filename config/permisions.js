module.exports = {
    // /auth
    '^/auth$': {
        role: 'ANON',
        methods: [
            'GET',
            'POST'
        ]
    },
    // /api/v1/users
    '^/api/v1/users$': [
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
    ],
    // /api/v1/users/1
    '^/api/v1/users/\\d+$': [
        {
            role: 'USER',
            methods: [
                'UPDATE',
                'PUT',
                'DELETE'
            ]
        }
    ],
    // /api/v1/users/1/role
    '^/api/v1/users/\\d+/role$': [
        {
            role: 'ADMIN',
            methods: [
                'POST']
        }
    ]
};
