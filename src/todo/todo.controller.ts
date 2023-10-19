import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.create(createTodoDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.todoService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.todoService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req: Request) {
    return this.todoService.update(+id, updateTodoDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.todoService.remove(+id, req.user.id);
  }
}
