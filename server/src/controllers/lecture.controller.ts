import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ActiveLectureCodeState } from 'src/core/common/enums/code.enum';
import { LectureUseCases } from 'src/use-cases/lecture/lecture.use-case';

@UseGuards(AuthGuard('jwt'))
@Controller('api/lecture')
export class LectureController {
  @Inject(LectureUseCases)
  private readonly lectureUseCases: LectureUseCases;

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/getCodeStateByActiveLecture')
  getCodeStateBySubjectKey(
    @Body() request: any,
  ): Promise<ActiveLectureCodeState> {
    return this.lectureUseCases.getCodeStateByActiveLecture(request);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/getCodeByActiveLecture')
  getCodeByActiveLecture(@Body() request: any): Promise<string> {
    return this.lectureUseCases.getCodeByActiveLecture(request);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Get('/getActiveLectureAttendees/:id')
  getActiveLectureAttendees(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.lectureUseCases.getActiveLectureAttendees(id);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/removeLectureAttendee')
  removeLectureAttendee(@Body() request: any): Promise<number> {
    return this.lectureUseCases.removeLectureAttendee(request);
  }
}
