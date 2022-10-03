import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: "star574's blog",
    description: "star574's blog",
    base: "/",
    head: [
        [
            'link', { rel: 'icon', href: '/images/logo.png' }
        ]
    ],
    theme: defaultTheme({
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '科学上网',
                link: '/magic',
            },
            {
                text: '首页',
                link: '/',
            },
            {
                text: '首页',
                link: '/',
            },
        ]
    })
})