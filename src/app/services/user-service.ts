import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly API_URL = environment.apiUrl;
  
  private readonly GET_USERS = `${this.API_URL}/users`;

  http = inject(HttpClient);

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.GET_USERS);
  }
  
  createUser(user:any): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.GET_USERS,user);
  }
}
