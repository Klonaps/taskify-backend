import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto, ownerId: number) {
    const isCategoryExist = await this.databaseService.category.findFirst({
      where: {
        name: createCategoryDto.name,
        ownerId,
      },
    });
    if (isCategoryExist) throw new BadRequestException('Категория с таким названием уже сущетвует');
    const category = await this.databaseService.category.create({
      data: {
        ownerId: ownerId,
        ...createCategoryDto,
      },
    });

    return category;
  }

  async findAll(ownerId: number) {
    const categories = await this.databaseService.category.findMany({
      where: { ownerId: ownerId },
    });

    return categories;
  }

  async findOne(id: number, ownerId: number) {
    const category = await this.databaseService.category.findUnique({
      where: { id: id, ownerId: ownerId },
    });
    if (!category) throw new NotFoundException('Категория не найдена');

    return category;
  }

  async update(id: number, ownerId: number, updateCategoryDto: UpdateCategoryDto) {
    const isCategoryWithEditNameExist = await this.databaseService.category.findFirst({
      where: {
        name: updateCategoryDto.name,
        ownerId,
      },
    });
    if (isCategoryWithEditNameExist) throw new BadRequestException('Категория с таким названием уже сущетвует');
    const category = await this.databaseService.category.update({
      where: { id: id, ownerId: ownerId },
      data: {
        ...updateCategoryDto,
      },
    });

    return category;
  }

  async remove(id: number, ownerId: number) {
    await this.databaseService.category.delete({
      where: { id: id, ownerId: ownerId },
    });
    return `Категория #${id} удалена`;
  }
}
