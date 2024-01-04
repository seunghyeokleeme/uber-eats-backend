import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurants.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  @ValidateNested()
  @Type(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
