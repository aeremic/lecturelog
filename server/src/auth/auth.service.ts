import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../core/entities/user.entity';
import { RegisterDto } from 'src/core/dtos';
import { JwtService } from '@nestjs/jwt';
import { UserUseCases } from 'src/use-cases';
import { BcryptService } from 'src/services';

@Injectable()
export class AuthService {
  @Inject(UserUseCases)
  private userUseCases: UserUseCases;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(BcryptService)
  private bcryptService: BcryptService;

  //#region Login implementation

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = new Promise<UserEntity>((resolve, reject) => {
      if (email && password) {
        this.userUseCases.getByEmail(email, true).then((user) => {
          if (this.userUseCases.isFound(user) && user.hash) {
            this.bcryptService
              .checkPasswordHash(password, user.hash)
              .then((res) => {
                resolve(res);
              });
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });

    return user;
  }

  async login(req: any): Promise<any> {
    const result = new Promise((resolve, reject) => {
      if (req && req.body && req.body.email) {
        this.userUseCases.getByEmail(req.body.email).then((user) => {
          if (this.userUseCases.isFound(user)) {
            const payload = { id: user.id, role: user.role };

            resolve({
              accessToken: this.jwtService.sign(payload),
            });
          }
        });
      } else {
        reject();
      }
    });

    return result;
  }

  //#endregion

  //#region Registration implementation

  async register(registerDto: RegisterDto): Promise<boolean> {
    let result = false;

    if (registerDto && registerDto.email && registerDto.password) {
      const userInDb = await this.userUseCases.getByEmail(registerDto.email);

      if (!this.userUseCases.isFound(userInDb)) {
        const hashedPassword = await this.bcryptService.hashPassword(
          registerDto.password,
        );

        const userEntity: UserEntity = {
          firstname: registerDto.firstname,
          lastname: registerDto.lastname,
          email: registerDto.email,
          hash: hashedPassword,
          role: registerDto.role,
          isActivated: true,
        };

        if (await this.userUseCases.createOrUpdate(userEntity)) {
          result = true;
        }
      }
    }

    return result;
  }

  //#endregion

  //#region Private implementation

  //#endregion
}
