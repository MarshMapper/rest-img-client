# rest-img-client

This application is an Angular client for the [rest-img](https://github.com/MarshMapper/rest-img) photo album service and image resizing middleware.  The album service crawls a directory of images and provides a RESTful API for accessing the images.  This application calls that service and displays the albums and photos, using the image resizing middleware to get the image in the needed sizes for thumbnails, previews, etc.

The initial implementation is very simple and the main goal is to explore the use of modern browser features for optimally loading images.  Currently, the application creates a srcset for the photos, using the image resizing middleware to generate the needed sizes on demand.  The browser will then load the image baesd on the pixel desnity of the device and the size of the image on the screen.

The original intent was to use the NgOptimizedImage directive but it can only work on images known at compile time. Since the images are loaded dynamically, the directive cannot be used.  Instead, the application uses the standard img element and sets the srcset attribute dynamically.

# Standard Angular CLI commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8 and can be executed and updated with the standard CLI commands.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
