import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Company A', phone: 12345, email: 'CompanyA@ssw.com.au' },
      { name: 'Company B', phone: 12345, email: 'CompanyB@ssw.com.au' },
      { name: 'Company C', phone: 12345, email: 'CompanyC@ssw.com.au' }
    ];
  }
}
