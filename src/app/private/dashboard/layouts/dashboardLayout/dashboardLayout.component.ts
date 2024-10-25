import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../../core/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboardLayout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './dashboardLayout.component.html',
  styleUrls: ['./dashboardLayout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
