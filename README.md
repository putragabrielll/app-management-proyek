# App Management Project


## 📌 Getting Started

To run the project locally, follow these simple steps:

1. Clone this repository
```sh
  git clone https://github.com/putragabrielll/app-management-proyek
  cd app-management-proyek
```

2. Open in VSCode
```sh
  code .
```

3. install all the dependencies
```sh
  npm install
```

4. run the project
```sh
  npm run dev
```

#### 📌 If you want to runing this project on Docker, you can next this command

5. run this command for build image
```sh
  docker build . -t app-management-proyek:latest
```
4. run this command for run image
```sh
  docker run -p 8000:8000 app-management-proyek:latest
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_URL`

## API Reference

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/projects` | `POST` | Create project |
| `/projects` | `GET` | Get a list of project |
| `/projects/:id` | `GET` | Get a detailed of project |
| `/projects/:id` | `PUT` | Update project by id |
| `/projects/:id` | `DELETE` | Delete project by id|
| `/projects/:projectId/tasks` | `POST` | Create task by id project |
| `/projects/:projectId/tasks` | `GET` | Get all task by project id|
| `/tasks/:id` | `PUT` | Update task by id|
| `/tasks/:id` | `DELETE` | Delete task by id|