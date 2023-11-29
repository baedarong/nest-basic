import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('movies') // entry point
export class MoviesController {
  @Get()
  getAll() {
    return 'All movies';
  }

  @Get('search')
  search(@Query('year') searchingParams: string) {
    // queryParams decorator
    return `searching for a movie! made after searchingParams:: ${searchingParams}`;
  }

  // id 붙어있는 애는 맨 밑에 작성하기
  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `get Movie id: ${movieId}`;
  }
  @Post()
  create(@Body() movieData: { name: string; surplier: string }) {
    // json body decorator
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `remove Movie : ${movieId}`;
  }

  @Patch(':id')
  patchMovie(
    @Param('id') movieId: string,
    @Body() updateData: { name: string; surplier: string },
  ) {
    return {
      updateData: movieId,
      ...updateData,
    };
  }
}
