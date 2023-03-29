import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IListUsers } from '../list-users/IListUsers';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    getUsers(id: number): Observable<IListUsers> {
        return this.http.get<IListUsers>
            (`https://reqres.in/api/users?page=${id}`);
    }

    createUsers(user: { name: string, job: string }) {
        return this.http.post('https://reqres.in/api/users', user);
    }   // need to implemet try catch

    
}