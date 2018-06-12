import {TestBed, inject} from '@angular/core/testing';

import {TODOS_API, TodoService} from './todo.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

fdescribe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all todos', () => {
    const todo1 = {
      id: 1,
      title: 'title1',
      is_done: false
    };
    const todo2 = {
      id: 2,
      title: 'title2',
      is_done: false
    };

    const result = [];
    service.getTodos().subscribe(item => result.push(...item));
    const req = httpMock.expectOne(TODOS_API);
    req.flush([todo1, todo2]);

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(TODOS_API);
    expect(result).toEqual([todo1, todo2]);
  });

  it('should add new todo item to todo list', () => {
    const todo = {
      id: 1,
      title: 'title1',
      is_done: false
    };

    const result = [];
    service.addTodo(todo).subscribe(item => result.push(item));
    const req = httpMock.expectOne(TODOS_API);
    req.flush(todo);
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe(TODOS_API);
    expect(result).toEqual([todo]);
  });

  it('should update todo item', () => {
    const todo = {
      id: 1,
      title: 'title1',
      is_done: false
    };

    const result = [];
    service.updateTodo(todo).subscribe(item => result.push(item));
    const req = httpMock.expectOne(`${TODOS_API}/${todo.id}`);
    req.flush(todo);
    expect(req.request.method).toBe('PUT');
    expect(req.request.url).toBe(`${TODOS_API}/${todo.id}`);
    expect(result).toEqual([todo]);
  });

  it('should delete todo item', () => {

  });
});
