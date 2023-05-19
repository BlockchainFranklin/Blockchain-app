# Client application
## Technologies
The application was developed using given technologies and frameworks
* ![React][react-shield]
* ![Bootstrap][bootstrap-shield]
* ![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)
* ![CSS3](https://img.shields.io/static/v1?style=for-the-badge&message=CSS3&color=1572B6&logo=CSS3&logoColor=FFFFFF&label=)
* ![HTML5](https://img.shields.io/static/v1?style=for-the-badge&message=HTML5&color=E34F26&logo=HTML5&logoColor=FFFFFF&label=)
* ![JavaScript](https://img.shields.io/static/v1?style=for-the-badge&message=JavaScript&color=222222&logo=JavaScript&logoColor=F7DF1E&label=)

## Installation
We can run the application locally or via a docker image. To run locally, we must have Node.js installed along with npm (Node Package Manager). Having already installed npm being in a folder, we need to install all the files required to create the page. All packages used are located in the package.json file and we can install them with the command:
```sh
npm install
```
If there are no errors, we can already run our application in development mode using the command
```sh
npm run dev
```
We can enter to our app by address
```sh
localhost:3000
```



# Start docker image
We can also run an image of our application using dockerfile. To do that we need to have docker installed. After that we should enter command to build our image
```sh
docker build -t frontend .
```
After image is created we can run our container on port 80 by command
``` sh
docker run -p 80:3000 frontend 
```

We can enter to our app by address
```sh
localhost:80
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[react-shield]: https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge
[bootstrap-shield]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

