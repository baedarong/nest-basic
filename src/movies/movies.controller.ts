import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { IMovie } from './entities/movie.entity';
import { CreateMovieDTO, UpdateMovieDTO } from './dto/movie.dto.ts';

@Controller('movies') // entry point
export class MoviesController {
  // 서비스의 경우 수동으로 import 하지 않고 constructor 메서드를 사용하여 요청한다.
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): IMovie[] {
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingParams: number) {
    // queryParams decorator
    return `searching for a movie! made after searchingParams:: ${searchingParams}`;
  }

  // id 붙어있는 애는 맨 밑에 작성하기
  @Get(':id')
  getOne(@Param('id') movieId: number): IMovie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.movieService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.movieService.remove(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updatedData: UpdateMovieDTO) {
    return this.movieService.update(movieId, updatedData);
  }
}
