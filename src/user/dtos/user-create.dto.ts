import {  IsInt, IsString } from "class-validator";

export class UserCreateDto{
    @IsString()
    name: string;

    @IsInt()
    age: number;
}