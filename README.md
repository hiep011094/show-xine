# show-xine

# API

---

## Product

### GetProduct: http://localhost:4000/api/v1/products/ |--->:(GET)

### Create Product -- admin: http://localhost:4000/api/v1/admin/product/new |--->:(POST)

### Update Product -- admin: http://localhost:4000/api/v1/admin/product/:id |--->:(PUT)

### Delete Product -- admin: http://localhost:4000/api/v1/admin/product/:id |--->:(DELETE)

### Get Detail Product: http://localhost:4000/api/v1/admin/product/:id |--->:(GET)

---

## Authentication

### Register user: http://localhost:4000/api/v1/register |--->:(POST)

### Login user: http://localhost:4000/api/v1/login |--->:(POST)

### Logout user: http://localhost:4000/api/v1/logout |--->:(GET)

### Forgot Password user: http://localhost:4000/api/v1/password/forgot |--->:(POST)

### Reset Password user: http://localhost:4000/api/v1/password/reset/:token |--->:(PUT)

## User Router

### Get All And Delete product Reviews: http://localhost:4000/api/v1/reviews?id=**_&productId=_** |--->:(GET + DELETE)

### Create and Update review product: http://localhost:4000/api/v1/review |--->:(PUT)

### Get Details User: http://localhost:4000/api/v1/me/profile/ |--->:(GET)

### Update Profile user: http://localhost:4000/api/v1/me/profile/update |--->:(PUT)

### Update Password user: http://localhost:4000/api/v1/me/update/password |--->:(PUT)

### Delete user -- admin: http://localhost:4000/api/v1/admin/user/:id |--->:(DELETE)

### Update user -- admin: http://localhost:4000/api/v1/admin/user/:id |--->:(PUT)

### Get Single user -- admin: http://localhost:4000/api/v1/admin/user/:id |--->:(GET)

### Get all user -- admin:http://localhost:4000/api/v1/admin/users |--->:(GET)
