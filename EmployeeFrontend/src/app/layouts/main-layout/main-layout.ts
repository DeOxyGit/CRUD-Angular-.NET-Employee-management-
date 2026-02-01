import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink:'/'
      },
      {
        label: 'Create Employee',
        routerLink:'/create'
      },
    ];
  }
}
