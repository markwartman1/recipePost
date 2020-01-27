import { Post } from "../models/post.model";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable()
export class PostsService {
    private posts: Post[] = [];

        // { title: "Title 1", content: "Title 1 content here..." },
        // { title: "Title 2", content: "Title 2 content here..." },
        // { title: "Title 3", content: "Title 3 content here..." }
    
    private observedPosts = new Subject<Post[]>();

    constructor( private http: HttpClient ) {}

    /**
     * the first map is the imported one
     * the second map is the regular javaScript map operator
     * Video 56 mean stack
     * 
     * the pipe method convertes the database's _id to id of the front-end
     *
     */
    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    }
                });
            }))
            .subscribe((mappedPosts) => {
                this.posts = mappedPosts;
                this.observedPosts.next([...this.posts]);
            });

        //return [...this.posts]
    }

    getPostUpdateListener() {
        return this.observedPosts.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id);
    }

    addPost(pTitle: string, pContent: string) {
        const post: Post = { id: null, title: pTitle, content: pContent};
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message, "Angular post.service http method:post");
                post.id = responseData.postId;
                this.posts.push(post);
                this.observedPosts.next([...this.posts]);
        });

    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = {id: id, title: title, content: content};
        this.http.put('http://localhost:3000/api/posts/' + id, post)
            .subscribe(response => {
                console.log(response);
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.observedPosts.next([...this.posts]);
            });
    }

    delete(postId: string) {
        
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                console.log('Deleted');
                this.posts = this.posts.filter(really => really.id !== postId);
                this.observedPosts.next([...this.posts]);
            });
    }
}