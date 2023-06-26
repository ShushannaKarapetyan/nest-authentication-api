import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication<any>) {
  // configuration for swagger
  const config = new DocumentBuilder()
    .setTitle('Nest|Authentication API')
    .setDescription(
      'This is a simple user authentication API written in **Nest.js**.\n' +
        'The API allows users to register, login, and access their own data.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // tells the swagger module to create the document
  // with the config options we just built up
  const document = SwaggerModule.createDocument(app, config);

  // sets the route for the docs, adds it to the app
  // and passes in the documentation
  SwaggerModule.setup('api', app, document);
}
