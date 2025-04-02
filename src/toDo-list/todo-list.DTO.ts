import { Type } from "class-transformer";
import { IsNumber, IsOptional, isString, IsString, Min, IsBoolean, IsDate, IsDateString } from "class-validator";

export class QueryToDosDTO  {
    @IsBoolean()
    @IsOptional()
    completed: boolean;
}

export class QueryPostDTO  {
    @IsString()
    title: string;
    
    @IsDateString()
    @IsOptional()
    dueDate?: Date;
}
