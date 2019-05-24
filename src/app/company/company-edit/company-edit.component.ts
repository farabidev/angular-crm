import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.isNewCompany = !this.activatedRoute.snapshot.params['id'];
    this.buildForm();
    if (!this.isNewCompany){
      this.companyId = this.activatedRoute.snapshot.params['id'];

      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company));
    }
  }

  buildForm() {
    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        phone: [''],
        email: ['']
      }
    )
  }

  saveCompany() {
    if (this.isNewCompany){
      this.companyService.addCompany(this.companyForm.value);
    } else {
      const company: Company = {...this.companyForm.value, id: this.companyId};
      this.companyService.updateCompany(company);
    }
    this.router.navigateByUrl('/company/list');
  }

}
