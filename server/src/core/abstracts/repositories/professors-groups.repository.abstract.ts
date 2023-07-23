import { ProfessorsSubjectGroupsEntity } from "src/core/entities";
import { GenericRepositoryAbstract } from "./generic.repositoty.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class ProfessorsGroupsRepositoryAbstract extends GenericRepositoryAbstract<ProfessorsSubjectGroupsEntity>  { }
