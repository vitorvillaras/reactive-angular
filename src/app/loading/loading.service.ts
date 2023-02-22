import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";


@Injectable()
export class LoadingService {
    private loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    loading$: Observable<boolean> = this.loadingSubject$.asObservable();

    constructor() { 
        console.log("LoadingService constructor")
    }
    
    getLoading(): Observable<boolean> {
        return this.loadingSubject$.asObservable();
    }

    setLoading(loading: boolean) {
        this.loadingSubject$.next(loading);
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.setLoading(true)),
            concatMap(() => obs$),
            finalize(() => this.setLoading(false))
        );
    }
}