// assets
import { UserOutlined, BookOutlined, LaptopOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    BookOutlined,
    LaptopOutlined
};

// ==============================|| MENU ITEMS - NAVIGATION ||============================== //

const navigation = {
    id: 'group-navigation',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'subjects',
            title: 'Subjects',
            type: 'item',
            url: '/subjects',
            icon: icons.BookOutlined,
            breadcrumbs: false
        },
        {
            id: 'navigation',
            title: 'Students',
            type: 'item',
            url: '/students',
            icon: icons.LaptopOutlined,
            breadcrumbs: false
        }
    ]
};

export default navigation;
