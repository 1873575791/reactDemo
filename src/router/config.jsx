/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import Code from '../components/code'
import Animation from "../components/animation";
import Index from '../pages/index'

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
        ],
    },

    {
        path: '/',
        to: '/index',
    },
];

export default routes;
