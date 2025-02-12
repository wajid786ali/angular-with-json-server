import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employer-edit',
  templateUrl: './employer-edit.component.html',
  styleUrls: ['./employer-edit.component.css']
})
export class EmployerEditComponent implements OnInit {
  employer: any = {};
  photoFile: File | null = null;
  errorMessage: string = '';
  maxFileSize = 2 * 1024 * 1024; // 2MB file size limit

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employerId = this.route.snapshot.paramMap.get('id');
    if (employerId) {
      this.getEmployerById(employerId);
    }
  }

  getEmployerById(id: string) {
    this.http.get<any>(`http://localhost:3000/employers/${id}`).subscribe(
      (data) => {
        this.employer = data;
      },
      (error) => {
        console.error('Error fetching employer data:', error);
        alert('Failed to load employer details.');
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Only JPG and PNG files are allowed.';
        event.target.value = ''; // Clear the file input
        return;
      }
      if (file.size > this.maxFileSize) {
        this.errorMessage = 'File size must be less than 2MB.';
        event.target.value = ''; // Clear the file input
        return;
      }
      this.photoFile = file;
      this.errorMessage = ''; // Clear error if valid
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async updateEmployer(form: any) {
    if (form.valid) {
      const updatedEmployer = { ...this.employer };

      if (this.photoFile) {
        try {
          updatedEmployer.photo = await this.convertToBase64(this.photoFile);
        } catch (error) {
          console.error('Error converting photo:', error);
          alert('Failed to process the photo. Please try again.');
          return;
        }
      }
      this.http.put(`http://localhost:3000/employers/${this.employer.id}`, updatedEmployer).subscribe(
        () => {
          alert('Employer updated successfully!');
          this.router.navigate(['/employer-list']);
        },
        (error) => {
          console.error('Error updating employer:', error);
          alert('An error occurred while updating the employer.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
