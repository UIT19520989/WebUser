// import clsx from 'clsx/bind';
import React from 'react';
import PropTypes from 'prop-types';

// const cx = clsx.bind(styles);

const DefaultLayout = ({ children }) => {
    return (
        <div>
            DefaultLayout
            <div>{children}</div>
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
