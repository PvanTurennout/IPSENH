import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  xAxis = [];
  time = 0;

  constructor() {
    for (let i = 0; i <= 500; i++) {
      this.xAxis.push(i);
    }
  }

  ngOnInit(): void {
    this.animateLine();
  }

  animateLine() {
    const points = this.xAxis.map(x => {
      const windowVerticalCenter = window.innerHeight / 2;
      const y = windowVerticalCenter + this.calculateY(x + this.time);
      return [x * window.innerWidth / 500, y];
    });

    const path = "M" + points.map(p => {
      return p[0] + "," + p[1];
    }).join(" L");

    const svgElement = document.getElementById("line-path");
    if (!svgElement) {
      return;
    }
    svgElement.setAttribute("d", path);
    this.time += 0.6;
    requestAnimationFrame(() => this.animateLine());
  }

  calculateY(x: number) {
    return 100 * (
      Math.sin(x / 20) +
      Math.sin(Math.PI * (x / 20)) +
      Math.sin(Math.sqrt(2) * (x / 10)) / 2
    );
  }
}
