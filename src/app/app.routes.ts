import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentComponent } from './pages/student/student.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostEditorComponent } from './pages/post-editor/post-editor.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
    { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
    { path: 'post-editor', component: PostEditorComponent, canActivate: [AuthGuard] },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] }
];
