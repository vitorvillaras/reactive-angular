import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { filter, tap } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent implements OnDestroy {
  @Input() courses: Course[] = [];
  @Output()
  private courseChanged = new EventEmitter();
  subscription: Subscription;
  constructor(private dialog: MatDialog) {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    this.subscription = dialogRef
      .afterClosed()
      .pipe(
        filter((val) => !!val),
        tap((val) => this.courseChanged.emit(val))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
