import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit {
  pageTitle = 'Musicisum';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 600px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }
        else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }

  ngOnInit(): void {}

}
