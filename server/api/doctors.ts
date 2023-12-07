export default defineEventHandler((event) => {
    return {
        data: [
            {
                id: 1,
                full_name: 'دکتر محمد کریم سلطانی',
                profession: {
                    id: 1,
                    name: 'متخصص ارتودنسی'
                },
                logo: '/images/doctors/1.png',
            },
            {
                id: 2,
                full_name: 'دکتر محمد قربانی',
                profession: {
                    id: 1,
                    name: 'متخصص ارتودنسی'
                },
                logo: '/images/doctors/2.png',
            },
        ]
    }
})