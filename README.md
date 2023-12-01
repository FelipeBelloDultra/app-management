# App Management

## Description

Full stack application (Next.js app folder + Postgres) to work as board to create to-do lists using the relation `board->task[] task->board`.

## How to run

- Clone the repo
- Configure the **.env** file with postgres connection URL
- Run `npx prisma migrate dev` to create database and tables
- Run `npm run dev` to start development server
