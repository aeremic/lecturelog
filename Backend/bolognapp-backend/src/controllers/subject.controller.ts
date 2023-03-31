import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';
import { SubjectUseCases } from 'src/use-cases';

@Controller('api/subject')
export class SubjectController {
    @Inject(SubjectUseCases)
    private readonly SubjectUseCases: SubjectUseCases

    @Get()
    getAll(){
        return this.SubjectUseCases.get();
    }

    @Get(':id')
    getSubjectById(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
        return this.SubjectUseCases.getSubjectById(id);
    } 
}