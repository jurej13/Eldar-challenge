import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PostModel } from '../../../../shared/interfaces/post.interface';
import { DashboardService } from '../../services/dashboard.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../core/store/auth/selectors/auth.selectors';
import { take } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
@Component({
  selector: 'dashboard-modal-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './dashboardModal.component.html',
  styleUrl: './dashboardModal.component.scss',
})
export class DashboardModalComponent {
  @Output() postCreated = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private dashboardService = inject(DashboardService);
  private store = inject(Store);
  private toastService = inject(ToastService);

  visible = false;
  data?: PostModel;
  userData$ = this.store.select(selectUser);
  userId: number = 0;
  constructor() {
    this.userData$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(3)]],
    userId: [''],
  });

  openModal(data?: PostModel) {
    this.visible = true;
    this.data = data;
    this.form.reset();
    if (data) {
      this.form.patchValue({
        title: data.title,
        body: data.body,
        userId: data.userId,
      });
    }
  }

  closeModal() {
    this.visible = false;
    this.form.reset();
    this.data = undefined;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      if (this.data) {
        const updateData = {
          ...formData,
          id: this.data.id,
        };
        this.dashboardService.editPost(updateData).subscribe({
          next: (response) => {
            this.closeModal();
            this.postCreated.emit();
          },
          error: (error) => {
            this.toastService.error('Error al editar el post');
            console.error('Error al editar:', error);
          },
          complete: () => {
            this.toastService.success('Post editado con exito');
          },
        });
      } else {
        const createData = {
          ...formData,
          userId: this.userId,
        };
        this.dashboardService.createPost(createData).subscribe({
          next: (response) => {
            this.closeModal();
            this.postCreated.emit();
          },
          error: (error) => {
            this.toastService.error('Error al crear el post');
            console.error('Error al crear:', error);
          },
          complete: () => {
            this.toastService.success('Post creado con exito');
          },
        });
      }
    }
  }
}
