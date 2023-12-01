import { Injectable, NotFoundException } from '@nestjs/common';
import { IMovie } from './entities/movie.entity';
import { CreateMovieDTO, UpdateMovieDTO } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  private movies: IMovie[] = [];

  getAll(): IMovie[] {
    return this.movies;
  }

  getOne(id: number): IMovie {
    console.log(`getOneParamsType: `, typeof id);
    const movie = this.movies.find((movie) => movie.id == id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found.`);
    }
    return movie;
  }

  remove(id: number): IMovie[] {
    this.getOne(id);
    this.movies = this.movies = this.movies.filter((movie) => movie.id != id);
    return this.movies;
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies;
  }

  update(id: number, updateData: UpdateMovieDTO): IMovie[] {
    const movie = this.getOne(id);
    this.remove(id);
    const newData = {
      ...updateData,
      id: id,
    };
    this.movies.push({ ...movie, ...newData });
    return this.movies;
  }
}

export const dummydata = [
  {
    id: 1,
    title: '서울의 봄',
    year: 2023,
    genres: ['드라마'],
  },
  {
    id: 2,
    title: '괴물',
    year: 2023,
    genres: ['멜로', '로맨스'],
  },
  {
    id: 3,
    title: '그대들은 어떻게 살 것인가',
    year: 2023,
    genres: ['애니메이션'],
  },
  {
    id: 4,
    title: '프레디의 피자가게',
    year: 2023,
    genres: ['공포'],
  },
];
