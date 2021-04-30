import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts_data: any
  advertisementList = []
  postList = []
  refreshingData = true
  metaData;
  createPostForm = new FormGroup(
    {
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      is_advertisement: new FormControl(false, Validators.required),
      image: new FormControl()
    }
  )

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.refreshingData = true
    this.postService.getAllPosts()
      .subscribe(data => {
        this.refreshingData = false;
        // this.posts_data = data;
        this.advertisementList = [];
        this.postList = [];
        [].concat(data).forEach(item =>
          {
            item.is_advertisement ? this.advertisementList.push(item) : this.postList.push(item)
          })
          this.refreshingData = false
      })
  }

  processFile(imageFile) {
    const file: File = imageFile.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.createPostForm.value.image = reader.result     
    });

    reader.readAsDataURL(file);
  }

  removeImage()
  {
    this.createPostForm.value.image = null
  }

  onCreatePostFormSubmit() 
  {
    this.refreshingData = true
    this.createPostForm.value["creater"] = sessionStorage.getItem("userId")
    this.createPostForm.value.role = sessionStorage.getItem('role')
    this.postService.createNewPost(this.createPostForm.value)
      .subscribe(
        (data) => {
          this.createPostForm.reset()
          this.postService.getAllPosts()
            .subscribe(data => {
              this.refreshingData = false;
              this.advertisementList = [];
              this.postList = [];
              [].concat(data).forEach(item =>
                {
                  item.is_advertisement ? this.advertisementList.push(item) : this.postList.push(item)
                })
            })
        }
      )
}

}
