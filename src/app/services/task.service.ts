// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5001/dashboard'; // Adjust the URL/port as needed

  constructor(private http: HttpClient) { }

  

  getclosedTasks(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/closed_tasks?email=${email}`).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('response:', response);
        }
      })
    );
  }
  getOpenTasks(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/open_tasks?email=${email}`).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('response:', response);
        }
      })
    );

}
getProjectList(email: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5001/project/get_my_projects?email=${email}`).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('response:', response);
      }
    })
  );

}
getProjectInfo(project_id: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5001/project/project_view?project_id=${project_id}`).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('response:', response);
      }
    })
  );
}
getCreateTaskInfo(project_id: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5001/project/get_create_task_info?project_id=${project_id}`).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('response:', response);
      }
    })
  );
}

createTask(taskData: any): Observable<any> {
  return this.http.post<any>(`http://localhost:5001/project/create_task`, taskData).pipe(
    tap(response => {
      if (response.projecttaskid) {
        console.log('Task created successfully:', response);
      }
    })
  );
}
}