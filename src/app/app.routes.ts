import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentComponent } from './pages/student/student.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostEditorComponent } from './pages/post-editor/post-editor.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'post-editor', component: PostEditorComponent },
    { path: 'menu', component: MenuComponent }
];
