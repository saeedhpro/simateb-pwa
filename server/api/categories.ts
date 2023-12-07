export default defineEventHandler((event) => {
    return {
        data: [
            {
                id: 1,
                title: 'دنداپزشکی',
                icon: '/images/categories/1.png',
                logo: '/images/categories/logo.png',
                has_child: true,
            },
            {
                id: 2,
                title: 'جراحی زیبایی',
                icon: '/images/categories/2.png',
                logo: '/images/categories/logo.png',
                has_child: false,
            },
            {
                id: 3,
                title: 'جراحی زیبایی',
                icon: '/images/categories/3.png',
                logo: '/images/categories/logo.png',
                has_child: false,
            },
            {
                id: 4,
                title: 'دنداپزشکی',
                icon: '/images/categories/1.png',
                logo: '/images/categories/logo.png',
                has_child: true,
            },
        ]
    }
})