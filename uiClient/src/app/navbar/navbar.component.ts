import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin = sessionStorage.getItem("isAdmin")
  username = sessionStorage.getItem("userName")
  role = sessionStorage.getItem('role')
  userCount = 0;
  postCount = 0
  constructor(private userService:UserService,private postService: PostService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('role') == 'admin')
    {
      this.userService.getUserCount()
      .subscribe(data =>
        {
            this.userCount = data['userCount']
        })

      setInterval(()=>
      {
        this.postService.getPostCount()
      .subscribe(data =>
        {
            this.postCount = data['postCount']
        })
      },10*1000)
    }
  }

  signout()
  {
    this.userService.signoutUser();
  }
}
