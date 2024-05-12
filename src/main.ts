import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3003;

  app.enableCors({ origin: 'http://localhost:*' });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Task')
    .setDescription('The Task API description')
    .setVersion('1.0')
    .addTag('task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => console.log(port));
}
bootstrap();
