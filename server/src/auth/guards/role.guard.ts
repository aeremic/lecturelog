import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/core/entities';
import { UserUseCases } from 'src/use-cases';

@Injectable()
export class RoleGuard implements CanActivate {
  @Inject(UserUseCases)
  private userUseCases: UserUseCases;

  constructor(private reflector: Reflector) { }

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
    let result = new Promise<boolean>((resolve, reject) => {
      this.userUseCases.getById(id).then((user) => {
        if (this.userUseCases.isFound(user)) {
          let res = roles.some((role) => role === user.role);
          resolve(res);
        } else {
          reject();
        }
      });
    });

    return result;
  }
}
