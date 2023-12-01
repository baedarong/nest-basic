import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('getAllFunc', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneFunc', () => {
    it('shoul return a Movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(1999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAll().length;
      service.remove(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.remove(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const before = service.getAll().length;
      service.create({ title: 'title', genres: ['test'], year: 2020 });
      const after = service.getAll().length;
      expect(after).toBeGreaterThan(before);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      const updatedData = {
        title: 'updatedTitle',
        genres: ['action', 'love'],
        year: 2020,
      };
      service.update(1, updatedData);
      const movie = service.getOne(1);
      expect(movie.title).toEqual(updatedData.title);
    });

    it('should throw a NotFoundException a movie', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
