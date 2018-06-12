import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {TodoItem} from '../../models/todo.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})


export class ToDoListComponent implements OnInit {

  todoList: TodoItem[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(items => this.todoList = items);
  }

  addTask(value): void {
    if (value === '') {
      return;
    }
    const todo = {
      title: value,
      is_done: false
    };
    this.todoService.addTodo(todo).subscribe(item => this.todoList.push(item));
  }

  removeTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.todoService.deleteTodo(id).subscribe();
  }

  updateTask(item) {
    this.todoService.updateTodo(item).subscribe();
  }

  clearTasks(): void {
    const do_delete = confirm('Are you sure to delete all tasks?');
    if (do_delete) {
      this.todoList.splice(0);
    }
  }

}
