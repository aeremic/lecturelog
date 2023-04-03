import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';
import { SubjectUseCases } from 'src/use-cases';

@Controller('api/subject')
export class SubjectController {
    @Inject(SubjectUseCases)
    private readonly subjectUseCases: SubjectUseCases

    @Get()
    getAll(){
        return this.subjectUseCases.get();
    }

    @Get(':id')
    getSubjectById(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
        return this.subjectUseCases.getSubjectById(id);
    } 
}