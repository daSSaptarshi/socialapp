import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  posts_data:any = [];
  @Output() onApprove = new EventEmitter();
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData = () =>
  {
    this.postService.getPendingPosts()
    .subscribe(data =>
      {
        console.log(data)
        this.onApprove.emit();
        this.posts_data = data;
      })
  }

}
