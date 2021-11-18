import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListService } from '../list.service';
import { Todo } from '../types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = new FormGroup({ task: new FormControl(), assignedTo: new FormControl(), dueAt: new FormControl() })
  todoId = null;
  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.initForm();
  }

  save() {
    this.listService.saveTodoAndCloseDialog({ ...this.form.value, id: this.todoId });
  }


  private initForm() {
    if (this.editMode) {
      const todo = JSON.parse(window.sessionStorage.getItem('todo') as any);
      this.todoId = todo.id;
      // filling the form with the pre-existing todo object
      Object.keys(todo).forEach(key => {
        if (this.form.controls[key]) {
          this.form.controls[key].patchValue(todo[key])
        }
      });
    }
  }

  private get editMode(): boolean {
    const todo = window.sessionStorage.getItem('todo');
    return !!todo;
  }

}
