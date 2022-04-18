# CRM Backend APi
This is  backned of ticket crm  system with MERN Stacke 

# HOW TO RUN the node server
git clone
cd crm-backend
npm i (if depency are not install for first time)
npm start (should start node server )

## User API Resouce

| * | Routes                           | Verbs | Progress | Is Private | Descroption                                      |
|---|----------------------------------|-------|----------|------------|--------------------------------------------------|
|1  | `/v1/user/login`                 | POST  | DONE     | No         | Verify user Authentication and return JWT        |
|2  | `/v1/user/request-reset-password`| POST  | TODO     | No         | verify email and email pin to reset the password |
|3  | `/v1/user/reset-password`        | PUT   | TODO     | No         | Reset the password to new one                    |
|4  | `/v1/user/`                      | GET   | DONE     | Yes        | Get User Info                                    |

### Ticket API Resources

All the user API router follows `/v1/ticket/`

| #   | Routers                        | Verbs | Progress | Is Private | Description                             |
| --- | ------------------------------ | ----- | -------- | ---------- | --------------------------------------- |
| 1   | `/v1/ticket`                   | GET   | DONE     | Yes        | Get all ticket for the logined in user  |
| 2   | `/v1/ticket/{id}`              | GET   | DONE     | Yes        | Get a ticket details                    |
| 3   | `/v1/ticket`                   | POST  | TODO     | Yes        | Create a new ticket                     |
| 4   | `/v1/ticket/reply/{id}`        | PUT   | TODO     | Yes        | Update ticket details ie. reply message |
| 5   | `/v1/ticket/update/{id}`       | PATCH | TODO     | Yes        | Update ticket details                   |
| 6   | `/v1/ticket/{id}`              | DELETE| TODO     | Yes        | Delete a ticket                         |

### Tokens API Resources

All the user API router follows `/v1/tokens`

| #   | Routers      | Verbs | Progress | Is Private | Description            |
| --- | ------------ | ----- | -------- | ---------- | ---------------------- |
| 1   | `/v1/tokens` | GET   | Done     | No         | Get a fresh access JWT |
