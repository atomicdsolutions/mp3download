import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-table',
  templateUrl: './metadata-table.component.html',
  styleUrls: ['./metadata-table.component.scss']
})
export class MetadataTableComponent implements OnInit {
  @Input()  metadata: any[] = [];
  displayedColumns: string[] = ['title', 'artist', 'album', 'year', 'genre', 'duration', 'comment'];

  constructor() { }

  ngOnInit(): void {
    
  }
}
