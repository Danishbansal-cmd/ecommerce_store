
export const loginFormElements = [
    { name: 'usernameOrEmail', componentType: 'input', label: 'Username Or Email', placeholder: 'Enter Username or Email', inputType: 'text' },
    { name: 'password', componentType: 'input', label: 'Password', placeholder: 'Enter your password', inputType: 'password' }
];

export const registerFormElements = [
    { name: 'username', componentType: 'input', label: 'Username', placeholder: 'Enter Username', inputType: 'text' },
    { name: 'email', componentType: 'input', label: 'Email', placeholder: 'Enter Email', inputType: 'text' },
    { name: 'password', componentType: 'input', label: 'Password', placeholder: 'Enter password', inputType: 'password' }
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
    { name: 'password', componentType: 'input', label: 'Employee Password', placeholder: 'Enter Password', inputType: 'text' },
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
    { name: 'email', componentType: 'input', label: 'Password Reset Email', placeholder: 'Enter Password Reset Email', inputType: 'email' },
]

export const resetPasswordElements = [
    { name: 'password', componentType: 'input', label: 'New Password', placeholder: 'Enter New Password', inputType: 'text' },
    { name: 'confirmpassword', componentType: 'input', label: 'Confirm Password', placeholder: 'Enter Password Again', inputType: 'text' },
]