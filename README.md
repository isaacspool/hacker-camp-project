# Hacker Schedule

This website manages the schedule for Hacker Camp. It allows staff to remove, add, and modify projects for any week of camp. They can submit new ones with the `/form` page and view them on the `/project/...` pages. Check out the `/help` page to learn some tips and tricks!

The website is (mostly) translated into both Hebrew and English. The translation files are in /public/lang.

#### What technologies does this project use?

It's completely coded in Javascript.

It uses the [NextJS](https://nextjs.org/) framework for the font end (client) and back end (server). NextJS uses [ReactJS](https://react.dev/) to render and handle state on the client. ReactJS is all about the components and JSX (HTML combined with Javascript).

NextJS itself mainly deals with the interactions between the server and the client. The server tells the client what to render, and the client requests new html and requests updates to the database. In the /src/app/ folder, you can see the different routes on the website separated by folder. Each `page.js` file has the root component for each of those routes.

The database it uses is [PostgreSQL](https://www.postgresql.org/), an open source relational database based on SQL. To create, read, update, and write (CRUD) from the database, it uses the [Prisma](https://www.prisma.io/) ORM. The schema is defined in /prisma/schema.prisma.

It uses a super simple library to add links to the project page descriptions automatically. The library is called [LinkifyJS](https://linkify.js.org/).

The website uses an unusual authentication strategy. There is one password shared among all of the staff (yes, it's not very secure). Each person using the website enters their name so the database knows who made the updates. That password is stored in the website cookies for the next few months. This system is a #1 priority to improve in the future.

#### How can I run this website on my computer?

If you'd like to run this yourself, you'll need a .env.local file.
It needs a `LOGIN_SECRET="..."` key (users will have to type that in on the login page) and database credentials. The most important database credentials are `POSTGRES_URL` and `POSTGRES_URL_NON_POOLING`. For example:

```yaml
LOGIN_SECRET="..."
POSTGRES_URL="postgres://username:password@url:port/database_name?sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://username:password@url:port/database_name?sslmode=require"
```

Once you have the .env.local and assuming you have [NodeJS](https://nodejs.org/en) installed, you'll need to run a few commands:

-   `npm install` to set up the packages
-   `npm run migrate:dev` to set up the PostgreSQL database
-   You need to seed the database, which expects that you're using the /prisma/seed.js file
    -   It won't have any json files to seed the database with, so you can either write your own seeding code by deleting everything in the main function or generating some data files that the existing seed.js file expects
    -   Most importantly, you need to seed the "category", "staff", and "room" tables of the database for the website to function correctly
    -   Run `npm run reset` when you're ready to run seed.js
-   `npm run dev` to run the website on your [localhost:3000](http://localhost:3000/)
