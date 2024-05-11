import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Feedback } from '../model/feedback.model';
import { FeedbackService } from '../feedback.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
feedback: Feedback[] = [];

constructor(private  feedbackService: FeedbackService){}

ngOnInit(): void {
  this.feedbackService.getFeedback().subscribe((data: any[]) => {
    this.feedback = data;
  });
}
submitResponse(item: Feedback): void {
  this.feedbackService.updateResponse(item.id, item.response).subscribe( () => {
    console.log('Response submitted:', item.response);
  },
   (error: any) => {
    console.error('Error Submitting response:', error);
  }
);
}


}
