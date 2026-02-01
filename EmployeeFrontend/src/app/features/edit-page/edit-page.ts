import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CreateService } from '../../core/service/create-service';
import { Department } from '../../core/model/department.model';
import { Create } from '../../core/model/create.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../../core/service/edit-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-page',
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.css',
})
export class EditPage implements OnInit {
  editService = inject(EditService);
  routes = inject(ActivatedRoute);
  createService = inject(CreateService);
  router = inject(Router);

  
  departments: Department[] = [];
  employeeId!: number;
  editForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      departmentId: [null, Validators.required],
    });
  }
  departmentss: Department[] = [];
  selectedDepartment: [] = [];
  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    var id = this.routes.snapshot.paramMap.get('id');
    this.employeeId = Number(id);
    this.getById(Number(id));
    this.onLoadDepartments();
  }
  getById(id: number) {
    this.editService.getById(id).subscribe({
      next: (res) => {
        this.editForm.patchValue(res);
        console.log('RES : ', this.editForm.value);
        this.cdr.detectChanges();
      },
    });
  }
  onSubmit() {
    if (this.editForm.valid) {
      console.log('EDIT FORM VALUE : ', this.editForm.value);
      this.editService.editEmployee(this.employeeId, this.editForm.value).subscribe({
        next: (res) => {
          console.log('Edit Success : ', res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `update id : ${this.employeeId} successful`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Edit Error : ', err);
        },
      });
    }
  }
  onLoadDepartments() {
    this.createService.getDepartments().subscribe({
      next: (res) => {
        this.departmentss = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error in onLoadDepartment : ', err);
      },
    });
  }
}
