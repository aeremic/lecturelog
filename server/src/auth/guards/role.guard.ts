import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserUseCases } from 'src/use-cases';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(UserUseCases)
  private userUseCases: UserUseCases;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.id);
  }

  private matchRoles(roles: string[], id: number): Promise<boolean> {
    const result = new Promise<boolean>((resolve, reject) => {
      this.userUseCases.getById(id).then((user) => {
        if (this.userUseCases.isFound(user)) {
          const res = roles.some((role) => role === user.role);
          resolve(res);
        } else {
          reject();
        }
      });
    });

    return result;
  }
}
