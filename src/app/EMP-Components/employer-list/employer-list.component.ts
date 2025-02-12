import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {

  employers: any[] = [];
  selectedEmployer: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployers();
  }

  loadEmployers() {
    this.http.get<any[]>('http://localhost:3000/employers').subscribe(
      (data) => {
        this.employers = data;
      },
      (error) => {
        console.error('Error fetching employers:', error);
      }
    );
  }

  viewDetails(employer: any) {
    this.selectedEmployer = employer;
  }

  deleteEmployer(employerId: number) {
    if (confirm('Are you sure you want to delete this employer?')) {
      this.http.delete(`http://localhost:3000/employers/${employerId}`).subscribe(
        () => {
          alert('Employer deleted successfully!');
          this.loadEmployers();
        },
        (error) => {
          console.error('Error deleting employer:', error);
        }
      );
    }
  }
}
