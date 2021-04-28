import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = "/app/post";
  private urls = {
    create      : `/create`,
    update      : `/update`,
    delete      : `/delete/`,
    getAll      : `/getAll`,
    getAllPending: `/getAllPending`,
    upvote      : `/upvote/`,
    approve     : `/approve/`,
    count       : `/getPostCount`
  }
  private isLoggedIn = false;

  constructor(public httpservice: HttpClient, configService : ConfigService ) {
    this.baseUrl = `${configService.config.apiBaseURL}${this.baseUrl}`
   }
  
  getAllPosts()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAll}`);
  }

  createNewPost(data)
  {
    return this.httpservice.post(`${this.baseUrl}${this.urls.create}`, data);
  }

  upvotePost(postId)
  {
    return this.httpservice.patch(`${this.baseUrl}${this.urls.upvote}${postId}`, {})
  }

  getPendingPosts()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.getAllPending}`);
  }

  approvePost(postId)
  {
    return this.httpservice.patch(`${this.baseUrl}${this.urls.approve}${postId}`, {});
  }

  getPostCount()
  {
    return this.httpservice.get(`${this.baseUrl}${this.urls.count}`)
  }
}
