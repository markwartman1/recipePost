import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../../../models/post.model";
import { PostsService } from 'src/app/services/post.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor( public postService: PostsService ) { }

  ngOnInit() {
    //this.posts = this.postService.getPosts();
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  delete( postId: string ) {
    this.postService.delete(postId);
  }

}
