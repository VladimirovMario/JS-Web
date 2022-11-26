# REST-api Endpoints Specification

### Base Url: https://localhost:3000/api


| HTTP Method | Description                                              |        Endpoint                  | Login Required |
| ----------- | -------------------------------------------------------- | -------------------------------- | -------------- |
| `POST`      | Signing up                                               | `/register`                      | No             |
| `POST`      | Signing in                                               | `/login`                         | No             |
| `POST`      | Logging out                                              | `/logout`                        | Yes            |
| `GET`       | Get all themes                                           | `/themes`                        | No             |
| `POST`      | Post new Theme                                           | `/themes`                        | Yes            |
| `POST`      | Post comment in Theme                                    | `/themes/:themeId`               | Yes            |
| `PUT`       | Subscribe to theme                                       | `/themes/:themeId`               | Yes            |
| `GET`       | Get latest posts                                         | `/posts?limit=5`                 | No             |
| `PUT`       | Edit post (possible only for the creator of this post)   | `/themes/:themeId/posts/:postId` | Yes            |
| `DELETE`    | Delete post (possible only for the creator of this post) | `/themes/:themeId/posts/:postId` | Yes            |
| `PUT`       | Like a post                                              | `/likes/:postId`                 | Yes            |
| `GET`       | Get user info / Verify if user is logged in              | `/users/profile`                 | Yes            |
| `PUT`       | Update user info                                         | `/users/profile`                 | Yes            |
