import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
   declarations: [],
   imports: [
     CommonModule,
     MatDialogModule,
     MatFormFieldModule,
     MatCardModule,
     MatSnackBarModule,
     MatInputModule,
     MatButtonModule,
     MatIconModule,
     MatMenuModule,
     MatSidenavModule
   ],
   exports: [
     CommonModule,
     MatDialogModule,
     MatFormFieldModule,
     MatCardModule,
     MatSnackBarModule,
     MatInputModule,
     MatButtonModule,
     MatIconModule,
     MatMenuModule,
     MatSidenavModule
   ]
 })
export class MaterialModule {

}

