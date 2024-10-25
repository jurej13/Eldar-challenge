import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableDashboardComponent } from '../../components/tableDashboard/tableDashboard.component';
import { DashboardModalComponent } from '../../components/dashboardModal/dashboardModal.component';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectRole } from '../../../../core/store/auth/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { UserRoleEnum } from '../../../../core/enums/UserRole.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableDashboardComponent,
    DashboardModalComponent,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('createModal') createModal!: DashboardModalComponent;
  @ViewChild(TableDashboardComponent) tableDashboard!: TableDashboardComponent;
  searchTerm: string = '';
  private store = inject(Store);
  userRole$ = this.store.select(selectRole);
  userEnum = UserRoleEnum;
  constructor() {}
  openModal() {
    if (this.createModal) {
      this.createModal.openModal();
    }
  }
  onPostsChange() {
    const tableComponent = this.tableDashboard;
    if (tableComponent) {
      tableComponent.loadPosts();
    }
  }
}
