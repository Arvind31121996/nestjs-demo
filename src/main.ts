import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APIPrefix } from '@constant/common';
import { ValidationFilter } from '@components/utils/http-exception.filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import config from '@components/utils/config'


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new ValidationFilter());

  app.setGlobalPrefix(APIPrefix.Version);
  const port = parseInt(process.env.SERVER_PORT);

  const options = new DocumentBuilder()
     .setTitle("NestJs Demo")
     .setDescription("description")
     .setVersion("1.0")
     .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
      )
    // .addBearerAuth('Authorization', 'header')
     .build();
  const document = SwaggerModule.createDocument(app, options);
  
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup("/api", app, document);
  

  await app.listen(port);
}

bootstrap();
