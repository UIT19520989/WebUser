import React from 'react';
import BgProfile from '../../assets/imgs/bg-profile.jpg';
import profilavatar from '../../assets/imgs/user.webp';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Avatar, Button, Card, Col, Row } from 'antd';
import { deletebtn, pencil } from '~/components/Icons';

const cx = classNames.bind(styles);

const Profile = () => {
    return (
        <>
            <div className={cx('profile-nav-bg')} style={{ backgroundImage: 'url(' + BgProfile + ')' }}></div>
            <Card
                className="card-profile-head"
                bodyStyle={{ display: 'none' }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" src={profilavatar} />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">Sarah Jacob</h4>
                                    <p>CEO / Co-Founder</p>
                                </div>
                            </Avatar.Group>
                        </Col>
                        <Col
                            span={24}
                            md={12}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div className="col-action">
                                <Button type="link" danger>
                                    {deletebtn}DELETE
                                </Button>
                                <Button type="link" className="darkbtn">
                                    {pencil} EDIT
                                </Button>
                            </div>
                        </Col>
                    </Row>
                }
            ></Card>
        </>
    );
};

export default Profile;
