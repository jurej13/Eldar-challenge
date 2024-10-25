import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { sidebarLinks } from '../../../consts/sidebarConfig.const';
import { SidebarModel } from '../../../interfaces/sidebarConfig.interface';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/auth/actions/auth.actions';

@Component({
  selector: 'sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <div class="Sidebar" [class.open]="isOpen" [class.mobile]="isMobile">
      <p-button
        class="Sidebar-toggle"
        icon="pi pi-angle-double-right"
        (click)="toggleSidebar()"
      >
      </p-button>

      <nav class="Sidebar-nav">
        <ul class="Sidebar-links">
          <li *ngFor="let link of links" class="Sidebar-link">
            <a [routerLink]="[link.path]" (click)="isMobile && toggleSidebar()">
              {{ link.name }}
            </a>
          </li>

          <div class="Sidebar-divider"></div>

          <li class="Sidebar-link Sidebar-link--logout">
            <a href="#" (click)="logout($event)"> Cerrar Sesión </a>
          </li>
        </ul>
      </nav>

      <div
        class="Sidebar-overlay"
        *ngIf="isOpen && isMobile"
        (click)="toggleSidebar()"
      ></div>
    </div>
  `,
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isOpen: boolean = false;
  isMobile: boolean = false;
  links: SidebarModel[] = sidebarLinks;
  private router = inject(Router);
  private store = inject(Store);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 1100;
    if (!this.isMobile) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}
