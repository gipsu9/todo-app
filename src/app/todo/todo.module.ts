import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {ToDoListComponent} from './containers/todo-list/todo-list.component';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './services/todo.service';



@NgModule({
  declarations: [
    ToDoListComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TodoService
  ],
  exports: [
    ToDoListComponent
  ]
})
export class TodoModule {
}
