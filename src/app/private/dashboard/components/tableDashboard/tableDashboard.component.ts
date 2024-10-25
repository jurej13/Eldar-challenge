import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DataTableService } from '../../../../shared/services/dataTable.service';
import { PostModel } from '../../../../shared/interfaces/post.interface';
import { Store } from '@ngrx/store';
import { selectRole } from '../../../../core/store/auth/selectors/auth.selectors';
import { UserRoleEnum } from '../../../../core/enums/UserRole.enum';
import { DashboardModalComponent } from '../dashboardModal/dashboardModal.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
@Component({
  selector: 'table-dashboard-component',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    TableModule,
    DashboardModalComponent,
  ],
  templateUrl: './tableDashboard.component.html',
  styleUrl: './tableDashboard.component.scss',
})
export class TableDashboardComponent implements OnInit {
  @ViewChild('editModal') editModal!: DashboardModalComponent;
  @Output() reloadPosts = new EventEmitter<void>();
  private dataTableService = inject(DataTableService);
  private store = inject(Store);

  userRole$ = this.store.select(selectRole);
  userEnum = UserRoleEnum;
  posts = signal<PostModel[]>([]);
  currentPage = signal<number>(1);
  loading = signal<boolean>(false);
  private searchDebouncer: Subject<string> = new Subject<string>();
  totalRecords = signal<number>(0);
  ngOnInit(): void {
    this.loadPosts();
    this.searchDebouncer
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.dataTableService.searchPosts(term);
        this.loadPosts();
      });
  }
  @Input() set searchTerm(value: string) {
    this.searchDebouncer.next(value);
  }
  loadPosts() {
    this.loading.set(true);
    this.dataTableService.getPaginatedPosts(this.currentPage()).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.totalRecords.set(this.dataTableService.getTotalPosts());
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.loadPosts();
  }
  onPageChange({ first, rows }: any) {
    let page: number = first / rows + 1;
    this.currentPage.set(page);
    this.loadPosts();
  }

  onPostUpdated() {
    this.reloadPosts.emit();
    this.loadPosts();
  }
  openEditModal(postData: PostModel) {
    if (this.editModal) {
      this.editModal.openModal(postData);
    }
  }
}
