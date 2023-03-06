import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { MessagesService } from "./messages.service";
import { Lesson } from "../model/lesson";

@Injectable({ providedIn: "root" })
export class CoursesService {
  constructor(
    private http: HttpClient,
  ) {}

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"].sort(sortCoursesBySeqNo)),
      shareReplay(),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      shareReplay(),
      catchError((err) => {
        console.log("Error saving course", err);
        return throwError(err);
      })
    );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>('/api/lessons', {
        params: {
          filter: search,
          pageSize: '20'
        }
      }).pipe(
        map(res => res['payload']),
        shareReplay(),
      )
  }
}
