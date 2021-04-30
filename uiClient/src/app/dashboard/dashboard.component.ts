import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersList = []
  refreshingData = true
  userCount = -1

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(data =>
      {
        this.refreshingData = false;
        this.usersList = data['data'];
        this.userCount = this.usersList.length
      })
    
    // this.userService.getUserCount()
    // .subscribe(data =>
    //   {
    //     this.userCount = data['userCount'] - 1
    //   })
  }

  deleteUser(id)
  {
    this.userService.deleteUser(id)
    .subscribe(data =>
      {
         this.usersList = this.usersList.filter(item => item._id != id)
         this.userCount = this.usersList.length
      })
  }

}
