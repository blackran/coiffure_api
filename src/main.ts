import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function bootstrap() {
  const port = process.env.PORT || 5000;
  const address = process.env.ADDRESS || 'localhost';

  NestFactory.create(AppModule)
    .then((app) => {
      // Enable CORS
      app.enableCors();
      // Implements validation globally
      app.useGlobalPipes(new ValidationPipe());
      const config = new DocumentBuilder()
        .setTitle('Coiffure api')
        .setDescription('This api was developped by wedevin')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer' })
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
      app
        .listen(port, address)
        .then(() => {
          console.info(
            `Àpplication listening on http://${address}:${port}/api`,
          );
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
bootstrap();
