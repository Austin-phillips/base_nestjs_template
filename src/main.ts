import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const firebase_config = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k9fl1%40base-app-f7d66.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

  admin.initializeApp({
    credential: admin.credential.cert(firebase_config as admin.ServiceAccount)
  })

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log("LISTENING ON PORT:", port)
  await app.listen(port);
}
bootstrap();
