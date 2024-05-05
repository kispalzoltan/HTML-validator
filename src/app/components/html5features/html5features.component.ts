import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-html5features',
  templateUrl: './html5features.component.html',
  styleUrl: './html5features.component.css'
})
export class Html5featuresComponent {
  features:any;
newInputTypesSupported: any;
  constructor(private sharingDataService:DataSharingService){
    let temp = this.sharingDataService.getHTML5Features();
    this.features = (temp && Object.keys(temp).length > 0) ? temp : false;
    console.log("features", this.features);
  }

}
