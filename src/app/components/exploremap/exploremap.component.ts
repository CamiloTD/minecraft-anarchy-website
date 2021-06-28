import { Component, OnInit } from '@angular/core';

interface Point3D {
  x: number;
  y?: number;
  z: number;
}

@Component({
  selector: 'app-exploremap',
  templateUrl: './exploremap.component.html',
  styleUrls: ['./exploremap.component.scss']
})
export class ExploreMapComponent implements OnInit {

  constructor() { }

  async ngOnInit() {

  }

  teleport (point: Point3D, worldname="world", zoom: number = 4, mapname="surface") {
    (window as any).$("#map")
      .attr('src', `http://192.168.100.75:8123/?worldname=${worldname}&mapname=${mapname}&zoom=${zoom}&x=${point.x}&y=${point.y || 64}&z=${point.z}`)
  }

}
