import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  // userInputTitle: string = "";
  // userInputContent: string = "";

  constructor( public postService: PostsService ) { }

  ngOnInit() {
  }

  postThis( form: NgForm  ) {
    if (form.value.invalid) {
      return;
    }

    this.postService.addPost( form.value.title, form.value.content );
    form.resetForm();
  }

}
