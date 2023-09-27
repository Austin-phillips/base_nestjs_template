import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const { authorization } = req.headers;

    if (!authorization) {
      return false;
    }

    const token = authorization.replace('Bearer ', '');

    try {
      const verifiedToken = await admin.auth().verifyIdToken(token);

      req.auth = {
        userId: verifiedToken.user_id,
        email: verifiedToken.email
      }

      return true;
    } catch (err) {
      return false
    };
  }
}
