# Hacker Schedule

This website manages the schedule for Hacker Camp.

#### What technologies does this project use?

It uses NextJS for the font end and back end. That uses ReactJS to render everything and handles state on the client.
NextJS mainly deals with the interactions between the server and the client. The server tells the client what to render, and the client requests new html and requests updates to the database.

The database it uses is PostgreSQL, a relational database based on SQL. To create, read, update, and write (CRUD) from the database, it uses the Prisma ORM. The schema is defined in /prisma/schema.prisma.

The website is (mostly) translated into both Hebrew and English. The translation files are in /public/lang.

The website uses an unusual authentication strategy. There is one password shared among all of the staff (yes, it's not very secure). Each person using the website enters their name so the database knows who made the updates. That password is stored in the website cookies for the next few months. This system is a #1 priority to improve in the future.

#### How can I run this website on my computer?

If you'd like to run this yourself, you'll need a .env.local.
It needs a `LOGIN_SECRET="..."` key and database credentials. The most important database credentials are `POSTGRES_URL` and `POSTGRES_URL_NON_POOLING`. For example:

```
POSTGRES_URL="postgres://username:password@url:port/database_name?sslmode=require"
POSTGRES_PRISMA_URL="postgres://username:password@url:port/database_name?sslmode=require&pgbouncer=true&connect_timeout=15"
```

Once you have the .env.local, you'll need to run a few commands:

-   `npm install` to set up the packages
-   `npm run migrate:dev` to set up the PostgreSQL database
-   You need to seed the database, which expects that you're using the /prisma/seed.js file
    -   It won't have any json files to seed the database with, so you can either write your own seeding code by deleting everything in the main function or generating some data files that my seed.js function expects
    -   Most importantly, you need to seed the "category", "staff", and "room" tables of the database
    -   Run `npm run reset` when you're ready to run seed.js.
-   `npm run dev` to run the website on your localhost:3000
