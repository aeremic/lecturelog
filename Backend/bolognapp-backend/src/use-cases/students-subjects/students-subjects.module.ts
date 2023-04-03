import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentsSubjects } from "src/services/implementations/models";

@Module({
    imports: [TypeOrmModule.forFeature([StudentsSubjects])]
})
export class StudentsSubjectsModule { }