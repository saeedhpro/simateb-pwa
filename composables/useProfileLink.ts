export default () => {
    return useState('links', () => [
        {
            link: '/account/profile/documents',
            icon: '/images/links/1.png',
            title: 'اسناد پزشکی من',
        },
        {
            link: '/account/profile/reserves',
            icon: '/images/links/2.png',
            title: 'نوبت های من',
        },
        {
            link: '/account/profile/settings',
            icon: '/images/links/3.png',
            title: 'تنظیمات',
        },
        {
            link: '/account/profile/referral',
            icon: '/images/links/4.png',
            title: 'دعوت از دوستان',
        },
    ])
}