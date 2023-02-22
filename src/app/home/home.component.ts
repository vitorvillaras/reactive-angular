import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { CoursesService } from "../services/courses.services";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../services";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  allCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.allCourses$ = this.coursesService.loadAllCourses().pipe(
      catchError((err) => {
        const message = "Could not load courses";
        this.messagesService.showMessages(message);
        console.log(message, err);
        return throwError(err);
      })
    );
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(this.allCourses$);
    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );
    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
  }
}
