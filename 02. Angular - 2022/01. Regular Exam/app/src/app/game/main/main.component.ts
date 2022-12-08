import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.loadFirstData().subscribe((data)=>{
      console.log(data);
      
    })
    
    this.apiService.loadFurniture().subscribe((data)=>{
      console.log(data);
      
    })
  }

}
