import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateUpdateSubjectResponseDto } from 'src/core/dtos/responses/create-update-subject-response.dto';
import { SubjectEntity } from 'src/core/entities';
import { SubjectUseCases } from 'src/use-cases';

@UseGuards(AuthGuard('jwt'))
@Controller('api/subject')
export class SubjectController {
  @Inject(SubjectUseCases)
  private readonly subjectUseCases: SubjectUseCases;

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  get() {
    return this.subjectUseCases.get();
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/getById/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
    return this.subjectUseCases.getById(id);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post()
  createOrUpdate(@Body() subjectEntity: any): Promise<SubjectEntity> {
    return this.subjectUseCases.createOrUpdate(subjectEntity);
  }

  @Roles('admin', 'professor')
  @UseGuards(RoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.subjectUseCases.delete(id);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/getsubjects')
  getSubjects(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.subjectUseCases.getSubjects(page, size);
  }

  @Roles('admin', 'professor')
  @UseGuards(RoleGuard)
  @Post('/createOrUpdateSubject')
  createOrUpdateSubject(
    @Body() request: any,
  ): Promise<CreateUpdateSubjectResponseDto> {
    return this.subjectUseCases.createOrUpdateSubject(request);
  }

  @Roles('admin', 'professor')
  @UseGuards(RoleGuard)
  @Get('/getSubject/:id')
  getSubject(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
    return this.subjectUseCases.getSubject(id);
  }
}
