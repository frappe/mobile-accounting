# Mobile Accounting

### Getting Started

#### Step 0

Make sure you have frappejs-Accounting setup up and running. If not, follow the guide [here](https://github.com/frappe/frappejs-accounting)


#### Step 1

Clone this repo
```bash
git clone https://github.com/frappe/mobile-accounting
```

#### Step 2

Install dependencies
```bash

cd mobile-accounting

yarn
```

#### Step 3

I assume most of us might be having Android devices, so to run it on android - connect the phone to your PC/Laptop.
Make sure you have USB debugging enabled in your device and ADB drivers installed in your PC/Laptop.
```bash

# Run this command
ionic cordova run android

# In order to live update code and check it instantly on your device, use
ionic cordova run android --livereload --consoleogs

# If you run into error of universalify package, run the following command and try the above command again
yarn add universalify
```

#### Optionally

You can also run it in your web browser using.
```bash
ionic serve
```
This will cause a CORS issue in the web browser.
In order to tackle that, goto
```bash

frappejs-Accounting > packages > frappejs > server > index.js

# add this line below the require morgan expression
app.use(cors());
```

#### Note

There is also a minor change needed in the Accounting package in order to make the login work.
```bash

# goto
frappejs-Accounting > packages > accounting > server > index.js

# add this line inside `await server.start`
authConfig: {}
```

### What's Important

If you look in the repo, you'll find a `frappe.js` file which is the most crucial one. Its responsible for establishing the connection with the frappejs backend. HTTPClient backend has been used for this app.

All that needs to be done is init this connection by providing it a server on app start. It also assigns itself to the window object, so that it can be used seamlessly across any pages that we create.

For reference checkout - [ToDo app](https://github.com/Zlash65/ToDo)
