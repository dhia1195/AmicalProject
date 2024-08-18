import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de CORS
  app.enableCors();

  app.use(bodyParser.json({ limit: '50mb' }));  
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 
  app.use('/public', express.static(path.join(__dirname, '../public')));

  await app.listen(3000);
}
bootstrap();
