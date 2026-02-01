import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Employee } from '../../core/model/employee.mode';
import { HomeService } from '../../core/service/home-service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-page',
  imports: [TableModule, ButtonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  employees!: Employee[];
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  homeService = inject(HomeService);

  ngOnInit(): void {
    this.onLoadData();
  }
  
  onEdit(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }
  onDelete(id: number) {
    console.log('Delete ID : ', id);
    Swal.fire({
      title: `Do you want to delete this employee id ${id}?`,
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.homeService.deleteEmployee(id).subscribe({
          next: (res) => {
            console.log('Delete Success : ', res);
            this.onLoadData();
          },
          error(err) {
            console.error('Delete Error : ', err);
          },
        });
      }
    });
    // this.homeService.deleteEmployee(id).subscribe({
    //   next: (res) => {
    //     console.log('Delete Success : ', res);
    //     this.onLoadData();
    //   },
    //   error(err) {
    //     console.error('Delete Error : ', err);
    //   },
    // });
  }
  onLoadData() {
    this.homeService.getEmployees().subscribe({
      next: (res) => {
        console.log('TEST : ', res);
        this.employees = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error : ', err);
      },
    });
  }
}
