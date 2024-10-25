import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  standalone: true,
  selector: 'app-authLayout',
  imports: [RouterOutlet],
  templateUrl: './authLayout.component.html',
  styleUrls: ['./authLayout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
