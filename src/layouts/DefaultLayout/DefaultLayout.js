import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Affix, Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import './DefaultLayout.css';
import Sidebar from '../components/Sidebar';

const { Header: AntHeader, Content, Sider } = Layout;

const DefaultLayout = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [sidenavType, setSidenavType] = useState('transparent');
    const [sidenavColor, setSidenavColor] = useState('#1890ff');
    const [fixed, setFixed] = useState(false);

    const openDrawer = () => setVisible(!visible);
    const handleSidenavType = (type) => setSidenavType(type);
    const handleSidenavColor = (color) => setSidenavColor(color);
    const handleFixedNavbar = (type) => setFixed(type);

    let { pathname } = useLocation();
    pathname = pathname.replace('/', '');
    pathname = pathname ? pathname : 'dashboard';
    return (
        <Layout className={`layout-dashboard ${pathname === 'profile' ? 'layout-profile' : ''} `}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
                style={{ background: sidenavType }}
            >
                <Sidebar color={sidenavColor} />
            </Sider>
            <Layout>
                {fixed ? (
                    <Affix>
                        <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                            <Header
                                onPress={openDrawer}
                                name={pathname}
                                handleSidenavColor={handleSidenavColor}
                                handleSidenavType={handleSidenavType}
                                handleFixedNavbar={handleFixedNavbar}
                            />
                        </AntHeader>
                    </Affix>
                ) : (
                    <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                        <Header
                            onPress={openDrawer}
                            name={pathname}
                            handleSidenavColor={handleSidenavColor}
                            handleSidenavType={handleSidenavType}
                            handleFixedNavbar={handleFixedNavbar}
                        />
                    </AntHeader>
                )}
                <Content className="content-ant">{children}</Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
