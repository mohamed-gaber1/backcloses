# BackCloses Backend

Backend API for a men's clothing showcase website.

The project provides a RESTful API for managing products, categories, offers, banners, branches, testimonials, settings, and about information.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Express Validator
- Multer
- Cloudinary
- dotenv

## 📁 Project Structure

```text
backcloses/
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── controllers/
│   ├── about.controller.js
│   ├── auth.controller.js
│   ├── banner.controller.js
│   ├── branch.controller.js
│   ├── category.controller.js
│   ├── offer.controller.js
│   ├── product.controller.js
│   ├── settings.controller.js
│   └── testimonial.controller.js
│
├── middlewares/
│   ├── authentication.middleware.js
│   ├── optionalAuthentication.middleware.js
│   ├── upload.middleware.js
│   └── validation.middleware.js
│
├── models/
│
├── routes/
│
├── seed/
│   └── createUsers.js
│
├── utils/
│   └── cloudinaryUpload.js
│
├── validation/
│
├── app.js
├── server.js
├── package.json
└── .gitignore