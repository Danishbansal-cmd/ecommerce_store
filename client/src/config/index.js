import { IoPersonCircle } from "react-icons/io5";
import { MdOutlineKey,MdEmail } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { GoGraph } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { AiFillMerge } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { BsChatLeftQuote } from "react-icons/bs";
import { TbStars } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { GoPersonAdd } from "react-icons/go";


export const loginFormElements = [
    { name: 'usernameOrEmail', componentType: 'input', label: 'Username or Email', placeholder: 'Enter Username or Email', inputType: 'text', iconProperty : IoPersonCircle },
    { name: 'password', componentType: 'input', label: 'Password', placeholder: 'Enter your password', inputType: 'password', iconProperty : MdOutlineKey  }
];

export const registerFormElements = [
    { name: 'username', componentType: 'input', label: 'Username', placeholder: 'Enter Username', inputType: 'text', iconProperty : IoPersonCircle },
    { name: 'email', componentType: 'input', label: 'Email', placeholder: 'Enter Email', inputType: 'email', iconProperty : MdEmail },
    { name: 'password', componentType: 'input', label: 'Password', placeholder: 'Enter password', inputType: 'password', iconProperty : MdOutlineKey }
];

export const addEmployeeElements = [
    { name: 'firstname', componentType: 'input', label: 'First Name', placeholder: 'Enter Firstname', inputType: 'text' },
    { name: 'lastname', componentType: 'input', label: 'Last Name', placeholder: 'Enter Lastname', inputType: 'text' },
    { name: 'email', componentType: 'input', label: 'Email', placeholder: 'Enter Email', inputType: 'email' },
    { name: 'phonenumber', componentType: 'input', label: 'Phone Number', placeholder: 'Enter Phone Number', inputType: 'number' },
    {
        name: 'status', componentType: 'select', label: 'Choose Status', options:
            ['active', 'terminated', 'on_leave'].map((item) => ({ id: item, label: item.charAt(0).toUpperCase() + item.slice(1) }))
    },
    { name: 'username', componentType: 'input', label: 'Employee Username', placeholder: 'Enter Username', inputType: 'text' },
    { name: 'password', componentType: 'input', label: 'Employee Password', placeholder: 'Enter Password', inputType: 'password' },
];

export const addProductElements = [
    { name: 'name', componentType: 'input', label: 'Name', placeholder: 'Enter Name', inputType: 'text' },
    { name: 'price', componentType: 'input', label: 'Price', placeholder: 'Enter Price', inputType: 'number' },
    { name: 'saleprice', componentType: 'input', label: 'SalePrice', placeholder: 'Enter Saleprice', inputType: 'number' },
    { name: 'quantity', componentType: 'input', label: 'Stock Quantity', placeholder: 'Enter Stock Quantity', inputType: 'number' },
    { name: 'description', componentType: 'input', label: 'Description', placeholder: 'Enter Description', inputType: 'text' },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
];

export const filterOptions = {
    category : [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand : [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ]
};

export const sendResetPasswordEmailElements = [
    { name: 'email', componentType: 'input', label: 'Password Reset Email', placeholder: 'Enter Password Reset Email', inputType: 'email', iconProperty : IoPersonCircle },
]

export const resetPasswordElements = [
    { name: 'password', componentType: 'input', label: 'New Password', placeholder: 'Enter New Password', inputType: 'password', iconProperty : MdOutlineKey },
    { name: 'confirmpassword', componentType: 'input', label: 'Confirm Password', placeholder: 'Enter Password Again', inputType: 'password', iconProperty : MdOutlineKey },
]

export const adminSidebarElements = [
    {
        subheading: [
            {
                name: "Dashboard",
                icon: GoHome, 
            }
        ]
    },
    {
        subheading: [
            {
                name: "Point of Sale",
                icon: GoGraph, 
            }
        ]
    },
    {
        heading: "ITEMS MANAGEMENT",
        subheading: [
            {
                name: "Items",
                icon: BsBox, 
                items: [
                    { name: "Add New" },
                    { name: "List" },
                    { name: "Bulk Import" },
                    { name: "Bulk Export" },
                ],
            },
            {
                name: "Categories",
                icon: AiFillMerge, 
                items: [
                    { name: "Category" },
                    { name: "Sub Category" },
                    { name: "Create Category" },
                ],
            }
        ]
    },
    {
        heading: "ORDER SECTION",
        subheading: [
            {
                name: "Orders",
                icon: AiOutlineShoppingCart, 
                items: [
                { name: "All" },
                { name: "Pending" },
                { name: "Confirmed" },
                { name: "Delivered" },
                { name: "Refunded" },
                { name: "Out for Delivery" },
                ],
            }
        ]
    },
    {
        heading: "MARKETING SECTION",
        subheading: [
            {
                name: "Banners",
                icon: FaRegImage, 
            },
            {
                name: "Coupons",
                icon: RiCoupon2Line, 
            }
        ]
    },
    {
        heading: "BUSINESS SECTION",
        subheading: [
            {
                name: "Notifications",
                icon: GoBell, 
            },
            {
                name: "Reviews",
                icon: TbStars, 
            },
            {
                name: "Chat",
                icon: BsChatLeftQuote, 
            },
        ]
    },
    {
        heading: "EMPLOYEE SECTION",
        subheading: [
            {
                name: "Employees",
                icon: BsBox, 
                items: [
                { name: "Add New" },
                { name: "List" },
                ],
            },
            {
                name: "Employee Role",
                icon: GoPersonAdd, 
            }
        ]
    },
]