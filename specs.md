# Backend API Specifications

## Public Questions
- List all questions asked that marked as public in the homepage of Hola Space
  * Pagination, filtering, etc (May not implement for now)
- Create new question
  * Owner and Admin Only
- Update a question
  * Owner and Admin Only
- Delete a question
  * Owner and Admin Only
- Set status for question
  * Owner and Admin Only
- Hastag included

## Users
### For public question implementation 
- List all questions of the logined user in their dashboards
  * Pagination, filtering, etc (May not implement for now)
- Create new question 
  * Authenticated users only
- Update question 
  * Owner
- Delete question
  * Owner 
- Hastag included

## Comments for Questions
- List all comments for a question 
  * Pagination, filtering, etc (May not implement for now)
- Create a comment
  * Authenticated users
- Update comment
  * Authenticated users only (Comment author)
- Delete comment
  * Question Owner and Admin only

## Search
### For public search
- Search user, questions by keyword or hashtag


## Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "user"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Admin
- Admin user can do everything on the app, except seeing the user's information (such as password, address, phone numbers)

## Security
- Encrypt passwords and reset tokens
- Prevent MySQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public (for now)

## Deployment (VPS)
- Push to Github
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt

## Code Related Suggestions
- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Express Validation
- Use async/await (create middleware to clean up controller methods)
