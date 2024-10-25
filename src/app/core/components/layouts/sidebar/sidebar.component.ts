import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { sidebarLinks } from '../../../consts/sidebarConfig.const';
import { SidebarModel } from '../../../interfaces/sidebarConfig.interface';
import { ButtonModule } from 'primeng/button';

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
}
