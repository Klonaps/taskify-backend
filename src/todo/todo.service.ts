import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodoDto: CreateTodoDto, ownerId: number): Promise<Todo> {
    const newTodo = await this.databaseService.todo.create({
      data: {
        ownerId: ownerId,
        ...createTodoDto,
      },
    });
    return newTodo;
  }

  async findAll(ownerId: number): Promise<Todo[]> {
    const todos = await this.databaseService.todo.findMany({
      where: { ownerId },
      include: {
        category: true,
      },
    });
    return todos;
  }

  async findOne(id: number, ownerId: number): Promise<Todo> {
    const todo = await this.databaseService.todo.findFirst({
      where: {
        id: id,
        ownerId: ownerId,
      },
    });
    if (!todo) throw new NotFoundException('Задача не найдена');
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, ownerId: number) {
    const updatedTodo = await this.databaseService.todo.update({
      where: { id: id, ownerId: ownerId },
      data: {
        ...updateTodoDto,
      },
    });
    return updatedTodo;
  }

  async remove(id: number, ownerId: number) {
    await this.databaseService.todo.delete({
      where: {
        id: id,
        ownerId: ownerId,
      },
    });
    return `Задача #${id} удалена`;
  }
}
