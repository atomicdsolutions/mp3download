import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metadata-display',
  templateUrl: './metadata-display.component.html',
  styleUrls: ['./metadata-display.component.scss']
})
export class MetadataDisplayComponent {
@Input() metadata: any;
  @Input()
  userAgent!: string;
}
