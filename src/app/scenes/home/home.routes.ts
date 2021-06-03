import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeComponent  as home} from './../../components/home/home.component';

export const HomeRoutes: Route[] = [
   {
       path:'',
       component:HomeComponent,
       children:[
           {
               path:'',
               component:home
           }
       ]
       
   },
   {
       path:'**',
       pathMatch:'full',
       redirectTo:''
   }
];