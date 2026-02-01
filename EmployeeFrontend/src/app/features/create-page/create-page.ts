import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CreateService } from '../../core/service/create-service';
import { ReactiveFormsModule } from '@angular/forms';
import { Department } from '../../core/model/department.model';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-create-page',
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './create-page.html',
  styleUrl: './create-page.css',
})
export class CreatePage implements OnInit {
  createService = inject(CreateService);
  router = inject(Router)
  cdr = inject(ChangeDetectorRef);
  employeeForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      departmentId: [null],
    });
  }

  value2: string | undefined;
  departments: Department[] = [];
  selectedDepartment: [] = [];
  ngOnInit(): void {
    this.onLoadDepartments();
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      this.createService.createEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          console.log('Employee created successfully', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error : ', err);
        },
      });
    }
  }
  onLoadDepartments() {
    this.createService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error in onLoadDepartment : ', err);
      },
    });
  }
}
