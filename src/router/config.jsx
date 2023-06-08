/* eslint-disable @typescript-eslint/naming-convention */
import React, { lazy } from 'react';

const Index = lazy(() => import('../pages/index'));
const Animation = lazy(() => import('../components/animation'));
const Code = lazy(() => import('../components/code'));
const PDFView = lazy(() => import('../components/PDF'));
const Grid = lazy(() => import('../components/grid'));
const VirtualScroll = lazy(() => import('../components/virtualScroll'));
const MyDom = lazy(() => import('../components/myDom'));

export const routes = [
    {
        path: '/index',
        element: <Index />,
        exclude: true,
        children: [
            {
                path: '/index/code',
                title: '代码编辑器',
                element: <Code />,
            },
            {
                path: '/index/animation',
                title: '页面滚动动画',
                element: <Animation />,
            },
            {
                path: '/index/PDF',
                title: 'PDF预览',
                element: <PDFView />,
            },
            {
                path: '/index/Grid',
                title: 'Grid布局',
                element: <Grid />,
            },
            {
                path: '/index/virtualScroll',
                title: '虚拟滚动',
                element: <VirtualScroll />,
            },
            {
                path: '/index/myDom',
                title: '弹框和锚点',
                element: <MyDom />,
            }
        ],
    },

    {
        path: '/',
        to: '/index',
    },
];

export default routes;
