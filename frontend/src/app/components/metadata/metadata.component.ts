import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadService } from '../../services/download.service';
import { Download } from '../../models/download.model';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {
  metadataForm!: FormGroup;
  metadata: any;  // This can be used to store and display the fetched metadata
  selectedFile: any = null;
  inputType: 'url' | 'file' = 'url';  // Default to 'url'

  constructor(
    private fb: FormBuilder,
    private downloadService: DownloadService
  ) { }

  ngOnInit(): void {
    this.metadataForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
    }
  }

  handleURLSubmission(): void {
    if (this.metadataForm.valid) {
      this.metadata = null;
      const url = this.metadataForm.value.url;
      this.downloadService.getMetadata({ url }).subscribe(
        (response: Download) => {
          // Handle the successful response, e.g., update the metadata table
          this.metadata = response.metadata;
          console.log('Metadata:', this.metadata);
        },
        (error: any) => {
          // Handle error response
          console.error('Error fetching metadata:', error);
        }
      );
    }
  }

  handleFileUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Upload the file
    this.downloadService.uploadFile(formData).subscribe((uploadResponse: Download ) => {
      // Handle the successful upload response
      this.metadata = uploadResponse.metadata;
      console.log('File uploaded successfully:', uploadResponse);
    }, uploadError => {
      console.error('Error uploading file:', uploadError);
    });
  }

  onSubmit(): void {
    if (this.inputType === 'url') {
      this.handleURLSubmission();
    } else if (this.inputType === 'file') {
      this.handleFileUpload();
    }
  }
}
