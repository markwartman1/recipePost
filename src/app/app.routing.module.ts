import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./components/post/posts-list/posts-list.component";
import { PostCreateComponent } from "./components/post/post-create/post-create.component";

const routes: Routes = [

    { path: '', component: PostsListComponent },
    { path: 'edit/:postId', component: PostCreateComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}