import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCenterDto } from './create-event-center.dto';

export class UpdateEventCenterDto extends PartialType(CreateEventCenterDto) {}
