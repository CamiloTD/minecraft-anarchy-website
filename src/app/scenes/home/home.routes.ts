import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeComponent  as home} from './../../components/home/home.component';
import { ProductsComponent } from "src/app/components/products/products.component";
import { DevelopmentComponent } from "src/app/components/development/development.component";
import { MissionVisionComponent } from "src/app/components/mission-vision/mission-vision.component";
import { ContactComponent } from "src/app/components/contact/contact.component";
import { ExploreMapComponent } from "src/app/components/exploremap/exploremap.component";
import { LiquidityComponent } from "src/app/components/liquidity/liquidity.component";

export const HomeRoutes: Route[] = [
   {
       path:'',
       component:HomeComponent,
       children:[
           {
               path:'',
               component:home
            },
           {
                path:'products',
                component:ProductsComponent
            },
            {
                path:'development',
                component:DevelopmentComponent
            },
            {
                path:'mission-vision',
                component:MissionVisionComponent
            },
            {
                path:'contact-us',
                component:ContactComponent
            },
            {
                path: 'exploremap',
                component: ExploreMapComponent
            },
            {
                path: 'liquidity',
                component: LiquidityComponent
            }
       ]
       
   },
   {
       path:'**',
       pathMatch:'full',
       redirectTo:''
   }
];