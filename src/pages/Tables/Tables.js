import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Radio, Table, Avatar, Typography, notification, Popconfirm } from 'antd';

// import { ToTopOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import adminface from '../../assets/imgs/admin.png';
import userface from '../../assets/imgs/user.webp';
import DeleteBtn from '~/components/DeleteBtn';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '~/redux/apiRequest';
// import { getAllUsers } from '~/redux/apiRequest';

const { Title } = Typography;

const columns = [
    {
        title: 'USER',
        dataIndex: 'username',
        key: 'username',
        width: '32%',
        sorter: (record1, record2) => {
            return record1.username.props.children.props.children[1].props.children[0].props.children.localeCompare(
                record2.username.props.children.props.children[1].props.children[0].props.children,
            );
        },
    },
    {
        title: 'FUNCTION',
        dataIndex: 'function',
        key: 'function',
        sorter: (record1, record2) => {
            return (
                record1.function.props.children.props.children[0].props.children >
                record2.function.props.children.props.children[0].props.children
            );
        },
    },

    {
        title: 'EMPLOYED',
        key: 'employed',
        dataIndex: 'employed',
        sorter: (record1, record2) => {
            console.log(record1.employed.props.children.props.children.props.children[0].props.children);
            return (
                record1.employed.props.children.props.children.props.children[0].props.children >
                record2.employed.props.children.props.children.props.children[0].props.children
            );
        },
    },
    {
        title: '',
        key: 'btn',
        dataIndex: 'btn',
    },
];

const Tables = () => {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState(null);
    const allUsers = useSelector((state) => state.user.user?.allUsers);

    const msg = useSelector((state) => state.user.msg?.mess);
    let msgState = useSelector((state) => state.user.msg?.msgState);

    useEffect(() => {
        setUserList(allUsers);
    }, [allUsers]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: msg ? msg : 'success',
        });
    };

    const [data, setData] = useState(null);

    const handleDelete = (id) => {
        deleteUser(dispatch, id);
        msgState = localStorage.getItem('deleteState');
        openNotificationWithIcon(msgState);
        getAllUsers(dispatch);

        if (msgState === 'success') {
            setUserList(
                userList.filter((user) => {
                    return user._id !== id;
                }),
            );
        }
    };

    const render = (userList) =>
        userList?.map((item, index) => {
            return {
                key: index,
                username: (
                    <>
                        <Avatar.Group>
                            <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={item.isAdmin ? adminface : userface}
                            ></Avatar>
                            <div className="avatar-info">
                                <Title level={5}>{item.username}</Title>
                                <p>{item.email}</p>
                            </div>
                        </Avatar.Group>
                    </>
                ),
                function: (
                    <>
                        <div className="author-info">
                            <Title level={5}>{item.isAdmin ? 'Admin' : 'User'}</Title>
                            <p>Developer</p>
                        </div>
                    </>
                ),

                employed: (
                    <>
                        <div className="ant-employed">
                            <span>
                                <Title level={5}>{item.createdAt.slice(0, 10)}</Title>
                                <p>{item.createdAt.slice(11, 19)}</p>
                            </span>
                        </div>
                    </>
                ),
                btn: (
                    <div
                        style={{ width: 'fit-content' }}
                        onClick={() => {
                            handleDelete(item._id);
                        }}
                    >
                        <DeleteBtn />
                    </div>
                ),
            };
        });

    const onChange = (e) => {
        if (e.target.value === 'b') {
            const adminItem = userList.filter((item) => item.isAdmin === true);
            setData(render(adminItem));
        } else {
            setData(render(userList));
        }
    };

    useEffect(() => {
        setData(render(userList));
    }, [userList]);

    return (
        <>
            {/* {msgState ? <Alert message={msg} type={msgState} closable showIcon /> : ''} */}
            {contextHolder}
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Users Table"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button value="a">All</Radio.Button>
                                        <Radio.Button value="b">ADMIN</Radio.Button>
                                    </Radio.Group>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{
                                        current: page,
                                        pageSize: pageSize,
                                        onChange: (page, pageSize) => {
                                            setPage(page);
                                            setPageSize(pageSize);
                                        },
                                    }}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Tables;
