import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mockTodos, Todo } from './types';
import { Observable, of } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { FormComponent } from './form/form.component';

@Injectable()
export class ListService {

    private dialogRef: any;
    constructor(private http: HttpClient,
        private dialogService: NbDialogService) { }

    get hostName(): string {
        return `localhost:5000`;
    }

    getList(): Observable<Todo[]> {
        const isDemo = true;
        // in demo mode we return mock data, else we return data from server
        if (isDemo) {
            return of(mockTodos);
        }
        return this.http.get<Todo[]>(`${this.hostName}/list`);
    }

    /**
     * 
     * @param todo The id inside the todo object may be null, 
     * in that case it means its a creation of a todo and not edit of existing todo.
     * @returns 
     */
    update(todo: Todo): Observable<any> {
        return this.http.post(`${this.hostName}/list`, { todo });
    }

    delete(id: number): Observable<any> {
        return this.http.post(`${this.hostName}/delete`, { id });
    }

    /**
     * In create mode we don't have a todo object
     * in edit mode, we pass the todo object.
     * the dialog will then inject the todo object into reactive form
     * @param todo 
     */
    openTodoForm(todo?: Todo): any {
        // setting up the form in sessionStorage so that the dialog can use it
        todo && window.sessionStorage.setItem('todo', JSON.stringify(todo));
        this.dialogRef = this.dialogService.open(FormComponent, { closeOnBackdropClick: false });
        return this.dialogRef;
    }

    saveTodoAndCloseDialog(todo: Todo) {
        this.update(todo).subscribe();
        window.sessionStorage.setItem('new-todo', JSON.stringify(todo));
        this.dialogRef.close();
    }

    clearSessionStorage() {
        setTimeout(() => window.sessionStorage.clear(), 3000);
    }
}