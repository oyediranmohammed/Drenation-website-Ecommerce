export const registerFormControls = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter your first name',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Choose a username',
    componentType: 'input',
    type: 'text', // Username can be alphanumeric, underscores, etc.
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email',
  },
  
  {
    name: 'mobile',
    label: 'Mobile Number',
    placeholder: 'Enter your phone number',
    componentType: 'input',
    type: 'tel', // You can validate with RegEx
  },
    {
    name: 'location',
    label: 'Location',
    placeholder: 'Enter your location',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Create Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Re-enter your password',
    componentType: 'input',
    type: 'password',
  },
  {
    name: 'profilePic',
    label: 'Upload Profile Picture',
    placeholder: '',
    componentType: 'input',
    type: 'file',
  },
];

export const loginFormControls = [
   {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email'       

    },
     
     {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'       

    }
]

export const addProductFormElements = [
    {
        label : "Title",
        name : "title",
        componentType : "input",
        type : "text",
        placeholder : "Enter product title",
    },
    {
        label : "Description",
        name : "description",
        componentType : "textarea",
        type : "text",
        placeholder : "Enter product description",
    },
    {
        label : "Category",
        name : "category",
        componentType : "select",
        options : [
            {id: "men", label: "Men"},
            {id: "women", label: "Women"},
            {id: "kids", label: "Kids"},
            {id: "accessories", label: "Accessories"},
            {id: "footwear", label: "Footwear"},
        ]
    },
    {
        label : "Brand",
        name : "brand",
        componentType : "select",
        options : [
            {id: "nike", label: "Nike"},
            {id: "adidas", label: "Adidas"},
            {id: "puma", label: "Puma"},
            {id: "levi", label: "Levi"},
            {id: "zara", label: "Zara"},
            {id: "h&m", label: "H&M"},
        ]
    },
    {
        label : "Price",
        name : "price",
        componentType : "input",
        type : "number",
        placeholder : "Enter product price",
    },
    {
        label : "Sale Price",
        name : "salePrice",
        componentType : "input",
        type : "number",
        placeholder : "Enter sale price (optional)",
    },
    {
        label : "Total Stock",
        name : "totalStock",
        componentType : "input",
        type : "number",
        placeholder : "Enter total stock",
    },



]


export const filterOptions = {
    category : [
        {id: "men", label: "Men"},
        {id: "women", label: "Women"},
        {id: "kids", label: "Kids"},
        {id: "accessories", label: "Accessories"},
        {id: "footwear", label: "Footwear"},

    ],
    brand : [
        {id: "nike", label: "Nike"},
        {id: "adidas", label: "Adidas"},
        {id: "puma", label: "Puma"},
        {id: "levi", label: "Levi's"},
        {id: "zara", label: "Zara"},
        {id: "h&m", label: "H&M"},

    ],
};

export const sortOptions = [
    {id : "price-lowtohigh", label : "Price: Low to High"},
    {id : "price-hightolow", label : "Price: High to Low"},
    {id : "title-atoz", label : "Title: A to Z"},
    {id : "title-ztoa", label : "Title: Z to A"},
];

