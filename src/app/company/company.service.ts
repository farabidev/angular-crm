import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();

    //refresh every 5 seconds
    //this.refreshData();
  }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  refreshData(){
      setInterval(() => {
        this.loadCompanies();
      }, 5000);
  }

  loadCompanies(){
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(error => this.errorHandler<Company[]>(error))
    ).subscribe(companies => this.companies$.next(companies));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  errorHandler<T>(error: Error): Observable<T> {
    console.error('Error!', error);
    return new Observable<T>();
  }

  deleteCompany(id: number) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    ).subscribe(companies => this.loadCompanies());
  }

  addCompany(company: Company) {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company/`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
      .pipe(
        catchError(e => this.errorHandler<Company>(e))
      ).subscribe(companies => this.loadCompanies());
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
      .pipe(
        catchError(e => this.errorHandler<Company>(e))
      ).subscribe(companies => this.loadCompanies());
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(
      `${this.API_BASE}/company/${id}`)
      .pipe(
        catchError(e => this.errorHandler<Company>(e))
      );
  }

}
