import {useState, useEffect} from 'react';
import {getAllStudents} from "./client";
import {Breadcrumb, Layout, Menu} from 'antd';
import {FileOutlined, PieChartOutlined, UserOutlined} from '@ant-design/icons';

import './App.css';

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', ""),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', "", [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [students, setStudents] = useState([]);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            })
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    if (students.length <= 0) {
        return "no data";
    }

    return (<Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    Bill is a cat.
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    </Layout>);
}

export default App;
