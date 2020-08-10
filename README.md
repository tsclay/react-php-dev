# 🐘 RAPP 🐘

This is a template for a project using the following tech stack:

- React for front-end UI
- Apache for web server
- PostgreSQL for database
- PHP for server language

See a deployment of this sample app [here](https://sample-rapp.herokuapp.com/).

**This guide is not a tutorial on how to use React, PHP, LAMP/MAMP, PostgreSQL, and Apache. This guide only covers configuration.**

<br>

## 💻 Database Setup 💻

First, make sure PostgreSQL is installed on your machine. If it's not, install it [here](https://www.postgresql.org/download/).

Start up the database server. The command for this may differ based on your configuration. Refer to [these docs](https://www.postgresql.org/docs/9.1/server-start.html).

```bash
postgres -D /usr/local/var/postgres/
```

In a separate tab, run the seed file that will create a database called "contacts", connect to it, create a "people" table, and populate it. Run this command from inside the project root; otherwise, you'll need to type the absolute path to the seed file.

```bash
$: psql -f API/models/seed.sql
> DROP DATABASE
> CREATE DATABASE
> You are now connected to database "contacts" as user "YourUserName".
> CREATE TABLE
> INSERT 0 4
```

<br>

## 📡 Pointing the MAMP server 📡
Go to your MAMP preferences and change the directory for the server to the public directory inside the project root.

<img src="./assets/MAMP.gif" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

## 🧪 Setup React 🧪

Start the development server that comes with React.

```bash
npm run start
```

Upon success, your browser should load the localhost for the server. It should look something like this:

<img src="./assets/hello2.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

## 🌎 Caring for the Environment 🌏

Our front-end and back-end will relate to each other differently between development and production modes.

In development, the React app lives on the dev server `localhost:3000` that we started with the `npm run start` command, and our PHP API lives on the Apache server `localhost:8888`. In production, the Apache server will host both sides.

Because of this, our API routes for AJAX requests need to change depending on the environment. We could configure an env file, but this is more work needed for only one API.

### Check out the index.js file

<img src="./assets/index.js.png" alt="Whoops..." style="width: 700px; height: auto; display: block; margin: 0 auto;">

<br>

Lines 8-19 handle our environment switch. When you're ready to deploy the app, just change the value of `ENV` to be `'prod'`. Again, the reason for this is that the Apache server will host both the React app that the client receives and the API/database combo for our full CRUD operations.

<hr>

On the PHP side, the only bit of environment dependent code is inside `API/models/person.php`.

```PHP
<?php

// Switch these depending on whether in development or production
// $dbconn = pg_connect('host=localhost dbname=contacts');
$dbconn = pg_connect(getenv("DATABASE_URL"));
```

Refer to the Heroku docs on [connecting to a PostgreSQL database in PHP](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-php).

<br>

## 😎 Customizing 😎

Change what you need! You can scrap the React components in this project and make your own. If you want to use functional components with React hooks, by all means, have at it!

The code in the API directory? Scrap it too! As long as you understand how to use React and how to setup the back-end with PHP, :thumbsup:.

<br>

## 🚀 Deploying your App 🚀

The [sample app](https://sample-rapp.herokuapp.com/) was deployed using Heroku, so the following will refer to that. So, if you prefer a different hosting service, make sure to read those docs! 🤓

Assuming you have a Heroku account, Heroku CLI, and XP with deploying to Heroku, set up a new app, add the heroku remote to your git urls, and add a PostgreSQL add-on for your database. 

### The React side

Change the `ENV` variable in `index.js` to something other than `'dev'`. Run `npm run build` to get the optimized bundle of code that will be used on the live site. The resulting build directory will look like this:

<img src="./assets/build_dir.png" style="display: block; margin: 0 auto;">

### The PHP side

The `index.html` will be our main route, and the JS and CSS files in the build directory will be loaded in that `index.html` file. The `.htaccess` file in the project root handles this.

If you look inside the build HTML file, you'll find that the scripts have `static` as the first directory in the paths. This confuses our Apache server, which will attempt to find the `static` folder in the project root, not in `build`. To solve this, we tell the server to prepend `build` to those routes so that it doens't freak out. Notice that the "/" route will be last in the `.htaccess` file to prevent other routes being caught by this one.

```Apache
# For the js and css assets when using React in PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^static/(.*)$ build/static/$1

# Reserved for the React build => PRODUCTION
RewriteCond %{REQUEST_METHOD} ^GET$
RewriteRule ^$ build/index.html
```

Brief sidebar: Take a look at the `composer.json` file:

```json
{
  "config": {
    "platform": {
      "php": "7.4.2"
    }
  },
  "require": {
    "php": "7.4.2"
  }
}
```

Two things about this file:

1. **You must have this file to deploy a PHP app to Heroku**, even if it is blank. The presence of this file in your root is enough to tell Heroku you intend to use PHP. Otherwise, Heroku will assume Node since there is a `package.json` file present.
2. The code in the file basically means, "Hey, we want to use PHP 7.4.2 for this application". If the version isn't specified, Heroku will pick 7.1.0, which is too low a version for this project. You can change this to be whichever version you need.

Run ```composer update``` from the project root in your terminal. This will create a `vendor` directory for your project, indicating that it worked. You won't need this in deployment, as Heroku will install one for you. It is already included in the `gitignore`.

  - If you change the PHP version in the `composer.json` file, delete the `vendor` directory and re-run ```composer update```.

Deploy to Heroku!

```bash
git add .
git commit -am 'please work'
git push heroku master
```

The only thing left to do at this point is setup the add-on database, which you can do from your terminal! All you need is the command that opens the `psql` shell for the cloud database. 

Check the following GIF on how to get that command:

<img src="./assets/heroku.gif" alt="Whoops..." style="width: 700px; height: 600px; display: block; margin: 0 auto;">

<br>

Once inside, you can copy/paste the code from the `seed.sql` file to seed your database.

<br>

## 🤔 Why use this? 🤔 

####   TL;DR: I believe using this template project will teach and reinforce concepts of full-stack development. Framework or no framework, apps are as secure as the developer makes them.
 
 *Why do this when one could use Laravel which offers React front-end scaffolding?*

 Laravel is robust, intuitive, and easy-to-use out of the box. However, it comes with some pain-points:

  - **Time required to learn it.** If you visit the Laracasts site for Laravel, you'll number a large store of videos on using Laravel. Visit Laravel's site, and you'll find extensive and well-written documentation. While this is exciting, it shows that one could spend months learning the "ins and outs" of the framework.

  - **Setting up and configuring a Laravel app** takes as much time as it does to create your app – sometimes more if you encounter errors during this phase.

  - **Are you using authentication/authorization in your app?** When you need to nail a picture to a wall, a hammer will do. I hope that metaphor makes sense.

  - **Laravel is secure by default when it comes to POST requests.** If your POST request doesn't include a CSRF token, then your request fails. Meaning, setting up POST requests in your forms require more work, especially when you're using React as your front-end instead of Blade templates.

  *Is security not important?*

  Security is important. This template project can be as secure as you make it. It is possible to secure an app without something like Laravel or Django. If you work with Express and Node, this is something you'd have to do anyway. Express doesn't protect your site from CSRF and XSS by default. If you want security out of the box, then I recommend researching Laravel or Django.

  *What's the gain of using this approach then?*

  I believe there are two gains to this approach.
  
  1. Learning how to write front-end and back-end code that interacts sensibly with each other. If you're familiar with using Node.js and Express, you'll recall that Express is unopinionated on what your sever needs to do. Again, it can be as secure as you want it to be. A framework such as Laravel is opinionated about elements such as authentication/authorization and database queries.

  2. The skills and insights taken from working with this can easily transfer to working with a framework such as Laravel. Much can be learned by securing your app without a framework doing it all for you. Those lessons will then provide insights as to why a given framework operates under certain opinions.

<br>

## ❓ Questions, Quandaries, and Queries ❓

Submit an issue with any ideas about this project! If you do, please be cordial and kind. There is enough nastiness in the world today.

Pull requests are welcome as well!

