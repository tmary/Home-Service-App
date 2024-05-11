import { Component , Input} from '@angular/core';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent {
  @Input() service!: Service;

}
