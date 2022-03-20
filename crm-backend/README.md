# CRM Backend APi
This is  backned of ticket crm  system with MERN Stacke 

# HOW TO RUN the node serve
git clone
cd crm-backend
npm i (if depency are not install for first time)
npm start (should start node server )

## User API Resouce

| * | Routes                           | Verbs | Progress | Is Private | Descroption                                      |
|---|----------------------------------|-------|----------|------------|--------------------------------------------------|
|1  | `/v1/user/login`                 | POST  | TODO     | No         | Verify user Authentication and return JWT        |
|2  | `/v1/user/request-reset-password`| POST  | TODO     | No         | verify email and email pin to reset the password |
|3  | `/v1/user/reset-password`        | PUT   | TODO     | No         | Reset the password to new one                    |
|4  | `/v1/user/`                  | GET   | TODO     | Yes        | Get User Info                                    |
