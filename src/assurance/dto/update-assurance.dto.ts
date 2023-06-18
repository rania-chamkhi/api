import { PartialType } from '@nestjs/mapped-types';
import { CreateAssuranceDto } from './create-assurance.dto';

export class UpdateAssuranceDto extends PartialType(CreateAssuranceDto) {}
