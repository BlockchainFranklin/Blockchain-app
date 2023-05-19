[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="logo/logo.png" alt="Logo" width="300" height="200">
  </a>

  <h3 align="center">ChainFit Repository Description</h3>

  <p align="center">
    A blockchain app that encourages people to be active
    <br />
    <br />
    <br />
    <a href="https://vimeo.com/828399505/0ea8991f12">View Demo</a>
  </p>
</div>

## About The Project
ChainFit is an application that utilizes blockchain technology to incentivize individuals to engage in physical fitness activities. Through the integration of blockchain, the app creates a decentralized platform that encourages people to adopt a healthy lifestyle.


The repository consists of several parts:
* **Analyzes** - here you can find a detailed description of the application development and maintenance plans. The average costs assumed by the authors and the analysis of existing solutions on the market have been calculated.
* **Client folder** - this folder contains a description of the technologies used and a description of the installation to run and edit the application. The folder contains all the files responsible only for the frontend part of the application.
* **Ethernum** - backend part of our application. Here you can find a description of the technologies used and a description of the most important methods.
* **Test** - folder with scripts responsible for generating sample data that were used to test the application.


In addition to the listed folders, there are also:
* **./github/workflows** - description of building and testing and publishing the latest versions of our application in the repository
* **ganache** - older containing instructions for building the Docker Ganache image

<!-- CONTACT -->
## Authors

The project was made by
* **Miłosz Szkudlarek** (leader of the team)
* **Julia Błaszczyk**
* **Adam Miernicki**

<!-- GETTING STARTED -->
## Start application
By downloading the entire repo material, it is possible to create and run a client folder image container using Docker.
### Prerequisites
To run a given image, we must have Docker installed and be in the root folder of the repository. Then we can run the application with this command
  ```sh
  docker-compose up
  ```
To check the operation of our application, launch the browser and type in it address:
```sh
  localhost:80
  ```
or in case of some problems
```sh
  127.0.0.1:80
  ```
The frontend application in the docker image starts in development mode, which means that in a given mode we also have access to, for example, error messages and the performance of the application will not be fully optimized.

In addition to the repository, it is possible to download the latest built version of the application thanks to githubaction from dockerhub
https://hub.docker.com/r/adammiernicki/franklinfrontend
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
