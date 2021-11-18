import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Todo } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Todo[] = [];

  constructor(private listService: ListService) { }

  /**
   * Loading the list when the component loads up
   */
  ngOnInit(): void {
    this.getList();
  }

  addTodo() {
    this.listService.openTodoForm().onClose.subscribe(() => {
      // when we click on save in the todo form, we save the new todo in session storage.
      // now we get it back from session storage to update our list
      const savedTodo = window.sessionStorage.getItem('new-todo');
      !!savedTodo && this.list.push(JSON.parse(savedTodo));
      this.listService.clearSessionStorage();
    });
  }

  edit(todo: Todo) {
    this.listService.openTodoForm(todo).onClose.subscribe(() => {
      // get the modified todo from session storage
      const modifiedTodo = JSON.parse(window.sessionStorage.getItem('new-todo') as any);
      // replace the todo in todo list
      const modifiedIndex = this.list.findIndex(i => i.id === modifiedTodo.id);
      this.list[modifiedIndex] = modifiedTodo;
      this.listService.clearSessionStorage();
    });
  }

  delete(id: number) {
    this.listService.delete(id).subscribe();
    this.list = this.list.filter(list => list.id !== id);
  }

  private getList() {
    this.listService.getList().subscribe(list => this.list = list);
  }
}
