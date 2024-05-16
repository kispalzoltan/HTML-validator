import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ValidatorService } from '../../services/validator.service';

// Then register the languages you need
hljs.registerLanguage('xml', xml);
@Component({
  selector: 'app-html5features',
  templateUrl: './html5features.component.html',
  styleUrl: './html5features.component.css'
})
export class Html5featuresComponent {
  features:any;
  newInputTypesSupported: any;
  highlightedCode = hljs.highlight(
    "",
    { language: 'xml' }
  ).value
  constructor(private sharingDataService:DataSharingService, private validatorService: ValidatorService,){
    //let temp = this.sharingDataService.getHTML5Features();
    let temp = this.validatorService.checkHTML5Features(this.sharingDataService.getHTMLData())
    this.features = (temp && Object.keys(temp).length > 0) ? temp : false;
    console.log("features", this.features);

    this.highlightedCode = hljs.highlight(
      this.sharingDataService.getHTMLData(),
      { language: 'xml' }
    ).value

  }

}
