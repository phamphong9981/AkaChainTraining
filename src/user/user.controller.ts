import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UserCreateDto } from "./dtos/user-create.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController{
    constructor(private userService: UserService){}

    @Get("")
    async getAll(){
      const users=await this.userService.findAll()
      return JSON.stringify(users)
    }

    @Get(":name")
    getFirst(@Param("name") name: string){
      return this.userService.findFirst(name)
    }

    @Delete(":id")
    delete(@Param("id") id:number){
      return this.userService.delete(id)
    }

    @Patch(":id")
    update(@Param("id") id:number,@Body() content:Partial<UserUpdateDto>){
      return this.userService.update(id,content)
    }

    @Post("/:id")
    async create(@Param("id") id:number, @Body() body:UserCreateDto){
      if(!await this.userService.create(id,body)){
        throw new HttpException("User existed", HttpStatus.BAD_REQUEST)
      }
      return true
    }
}