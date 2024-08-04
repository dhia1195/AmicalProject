import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de CORS
  app.enableCors();

  // Configuration de body-parser pour augmenter la taille maximale des requêtes
  app.use(bodyParser.json({ limit: '50mb' }));  // Augmente la taille maximale pour les données JSON
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  // Augmente la taille maximale pour les données encodées en URL

  await app.listen(3000);
}
bootstrap();
