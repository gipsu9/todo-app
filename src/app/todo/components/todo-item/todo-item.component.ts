import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from '../../models/todo.interface';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem;
  @Output() remove = new EventEmitter<number>();
  @Output() update = new EventEmitter<TodoItem>();

  constructor() {
  }

  removeItem(id: number): void {
    this.remove.emit(id);
  }

  toggle(): void {
    if (this.item.is_done) {
      this.item.is_done = false;
    } else {
      this.item.is_done = true;
    }
    this.update.emit(this.item);
  }

  ngOnInit() {
  }

}
