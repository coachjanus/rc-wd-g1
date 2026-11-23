import { Component } from '@angular/core';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';

@Component({
  selector: 'app-about',
  imports: [CustomButton],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
