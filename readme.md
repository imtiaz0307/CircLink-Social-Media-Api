# Social Media API

This API allows for the creation and management of user accounts, posts, and interactions on a social media platform.

## Endpoints
- `/api/users/signup`: Allows for the creation of a new user account.
- `/api/users/login`: Allows for a user to log in to their existing account.
- `/api/users/me`: Returns the currently logged in user's information.
- `/api/users/:userId`: Returns the information of the specified user.
- `/api/users/:userId/follow`: Allows the currently logged in user to follow the specified user.
- `/api/users/:userid/unfollow`: Allows the currently logged in user to unfollow the specified user.
- `/api/users/update`: Allows the currently logged in user to edit their profile information.
- `/api/users/delete`: Allows the currently logged in user to delete their account.
- `/api/posts/:postId`: Returns the specified post.
- `/api/posts/create`: Allows the currently logged in user to create posts.
- `/api/posts/:postid/edit`: Allows the currently logged in user to edit their specific post.
- `/api/posts/:postid/delete`: Allows the currently logged in user to delete their specific post.
- `/api/posts/:postId/react`: Allows the currently logged in user to like and unlike the specified post.
= `/api/posts/:postid/comments/:commentid`: Returns the specified comment.
- `/api/posts/:postid/comments/create`: Allows the currently logged in user to add a comment to a post
- `/api/posts/:postid/comments/:commentid/edit`: Allows the currently logged in user to update a comment they made on post
- `/api/posts/:postid/comments/:commentid/delete`: Allows the currently logged in user to delete a comment they made on post
- `/api/posts/:postid/comments/:commentid/react`: Allows the currently logged in user to like and unlike a comment on post
- `/api/posts/public/explore`: Returns all posts made on the platform, excluding those made by the currently logged in user.
- `/api/posts`: Returns all posts made on the platform by the current user and the users that are followed by current users.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- express-validator
- dotenv
- cors
- bcryptjs

## Note
The API is using ES Modules.

## Getting Started
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up a MongoDB database and configure the connection in the `.env` file.
4. Run `npm start` to start the API.
5. Use a tool such as Postman to test the endpoints.

## Contributing
If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Security
The API uses JSON Web Tokens for authentication and authorization. Passwords are hashed using bcrypt before they are stored in the database.

## Deployment
The API can be deployed on a variety of hosting platforms, such as Heroku or AWS. Make sure to properly configure the environment variables and set up a production-ready database.

## Support
For any support or questions, please open an issue or contact me.

## Acknowledgements
Special thanks to the open-source community for providing the tools and resources used in this project.
