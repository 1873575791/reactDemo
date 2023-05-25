import React, { Suspense } from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import RouteConfigs from './config';

function RouterView() {
    // 定义一个函数路由表
    const renderRouter = (arr) => arr.map((item, index) => <Route
        key={index}
        path={item.path}
        element={item.element
            ? <Suspense fallback={<>...</>} children={item.element}></Suspense>
            : <Navigate to={item.to ? item.to : '/'}></Navigate>}
    >
        {
            item.children && renderRouter(item.children)
        }
    </Route>);
    return (
        <Routes>
            {
                renderRouter(RouteConfigs)
            }
        </Routes>
    );
}
export default RouterView;
