import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import 'reflect-metadata';
import { TypeormStore } from 'connect-typeorm/out';
import { Session } from './utils/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  try {
    await app.listen(PORT, () => console.log(`running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
