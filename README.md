# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


## Build tools used:
- Gulp 3.9.1
- ### Plugins
  - browser-sync 2.24.7
  - gulp-autoprefixer 6.0.0
  - gulp-concat 2.6.1
  - gulp-eslint 5.0.0
  - gulp-html-replace 1.6.2
  - gulp-imagemin 4.1.0
  - gulp-jasmine-phantom 3.0.0
  - gulp-sass 4.0.1
  - gulp-sourcemaps 2.6.4
  - gulp-uglify 3.0.1
  - imagemin-pngquant 6.0.0
  
## Using Gulp tasks

All tasks are included in the default task, so simply run "gulp" to execute all tasks, including launching the jasmine framework.  (I used npm to install all packages)

## Ways to open the Feedreader application

  - Navigate to dist/index.html and open that in a browser of your choice
  - With gulp and dependencies installed, run 'gulp' in the terminal in the frontend-nanodegree-feedreader repository.
