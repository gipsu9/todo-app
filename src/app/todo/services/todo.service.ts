import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoItem} from '../models/todo.interface';

export const TODOS_API = '/api/todos';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(TODOS_API);
  }

  addTodo(item: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(TODOS_API, item);
  }

  updateTodo(item: TodoItem): Observable<any> {
    const url = `${TODOS_API}/${item.id}`;
    return this.http.put<TodoItem>(url, item);
  }

  deleteTodo(id): Observable<any> {
    const url = `${TODOS_API}/${id}`;
    return this.http.delete<TodoItem>(url);
  }
}
