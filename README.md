# IPSENH project
## Description
CI/CD: Gitlab CI and Sonarqube. \
Frontend: Angular with Angular Material. \
Backend: Nodejs with Express and Jest. \
We used a Mysql database, version 8.0.25. We also made use of Firebase cloud storage.

## Docker repositories
* [frontend](https://hub.docker.com/repository/docker/musicisum4ipsenh/frontend)
* [backend](https://hub.docker.com/repository/docker/musicisum4ipsenh/backend)
* [mysql dockerhub page](https://hub.docker.com/_/mysql)

## Visuals
Login screen:
![login screen](./resources/login_screen.png)

Main screen:
![main screen](./resources/main_screen.png)

## Environment variables

### Frontend
| Variables            |  Used For                     |
| :------------------: | :---------------------------: |
| production           | Is production? Boolean        |
| backendUrl           | address where backend is hosted. Expected to be able to append endpoint to this string (example value: http://localhost:3000/api/) |
| firebase             | object with variables to connect to firebase |

### Backend
| Variables            |  Used For                     |
| :------------------: | :---------------------------: |
| NODE_ENV             | to set running environment. supported: production, development, test |
| APP_PORT             | app port                      |
| DB_USER              | database user                 |
| DB_PASS              | database password             |
| DB_PORT              | database port                 |
| DB_HOST              | database address              |
| MYSQL_DB             | database name                 |
| SECRET               | jwt secret                    |
