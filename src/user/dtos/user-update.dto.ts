import {  IsInt, IsOptional, IsString } from "class-validator";

export class UserUpdateDto{
    @IsString()
    @IsOptional()
    name: string;

    @IsInt()
    @IsOptional()
    age: number;
}