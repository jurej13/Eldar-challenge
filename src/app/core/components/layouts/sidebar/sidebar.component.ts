import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { sidebarLinks } from '../../../consts/sidebarConfig.const';
import { RouterModule } from '@angular/router';
import { SidebarModel } from '../../../interfaces/sidebarConfig.interface';

@Component({
  selector: 'sidebar-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="Sidebar" [class.open]="true">
    <nav class="Sidebar-nav">
      <ul class="Sidebar-links">
        <li *ngFor="let link of links" class="Sidebar-Link">
          <a [routerLink]="[link.path]">{{ link.name }}</a>
        </li>
      </ul>
    </nav>
  </div>`,
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isOpen: boolean = false;
  links: SidebarModel[] = sidebarLinks;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
