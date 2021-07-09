import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {
  username = "User";
  userInitial = "U";

  constructor(private router: Router, private userService: UserService) {
    this.username = userService.getCurrentUser().username;
    this.userInitial = this.username.slice(0, 1);
  }

  ngOnInit(): void {

  }

  onLogOut(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
