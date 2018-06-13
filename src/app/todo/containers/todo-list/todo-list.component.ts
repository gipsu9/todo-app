import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {TodoItem} from '../../models/todo.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})


export class ToDoListComponent implements OnInit {

  todoList: TodoItem[];
  exists = false;

  @ViewChild('taskInput') taskInput: ElementRef;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(items => this.todoList = items);
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.addTask(event.target.value);
    }
  }

  onInput() {
    if (this.taskInput.nativeElement.value === '') {
      this.exists = false;
    }
  }

  addTask(value): void {

    this.exists = this.todoList.some(item => item.title === value);

    if (this.exists) {
      return;
    }

    if (value === '') {
      return;
    }

    const todo = {
      title: value,
      is_done: false
    };
    this.todoService.addTodo(todo).subscribe(item => this.todoList.push(item));
    this.taskInput.nativeElement.value = '';
  }

  removeTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.todoService.deleteTodo(id).subscribe();
  }

  updateTask(item) {
    this.todoService.updateTodo(item).subscribe();
  }
}
