import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as fs from 'fs'
const cookieParser = require('cookie-parser')
async function start() {
  const PORT = process.env.PORT || 7000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Freex docs")
    .setDescription("Freex documentation")
    .setVersion("0.1.5")
    .addTag("Freex")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.enableCors({
    credentials: true,
    origin: 'https://freex-front.vercel.app',
    
    allowedHeaders: ['Content-Type', 'Authorization'],

  });
  await app.listen(PORT, () => console.log(`Server stared on port = ${PORT}`))
  const url = await app.getUrl();
  console.log(url);
}

start()