import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  usersList: any[] = [];
  isLoading: boolean = true;
  text: string = "Loading...";
  filteredUsers: any[] = [];
  searchTerm: string = ''
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pagedUsers: any[] = [];

  constructor(private alertShow: AlertService, private userDataService: UserDataService, private route: ActivatedRoute, private titleService: Title) { }

  getAllUsers() {
    this.userDataService.getAllUsers().subscribe((res) => {
      this.usersList = res.users_list;
      this.filteredUsers = [...this.usersList];

      this.updatePagedUsers();

      setTimeout(() => {
        if (this.pagedUsers) {
          this.isLoading = false;
          this.text = "";
        } else {
          this.text = "No Data Found!";
          this.alertShow.info("There's nothing to show! 😕");
        }
      }, 1000);
      // console.log(this.usersList);
    },
      (err) => {
        console.error(err);
        this.text = "Something Went Wrong!😅";
        this.alertShow.error('Please check your connection! 📶')
      });
  }

  ngOnInit() {
    const title = this.route.snapshot.data['title'];
    this.titleService.setTitle(title);
    this.getAllUsers()
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.usersList.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.gender.includes(term) ||
      user.age.includes(term) ||
      user.phone_no.includes(term)
    );
    this.currentPage = 1;
    this.updatePagedUsers();
  }

  deleteUser(id: string, name: string) {
    this.alertShow.confirm(`Want to delete ${name}?`).then((result) => {
      // console.log(result.isConfirmed)
      if (result.isConfirmed) {
        // console.log(result)
        this.userDataService.deleteUser(id).subscribe((res) => {
          // console.log(res.success)
          if (res.success) {
            // console.log('hii');
            this.alertShow.success('User Deleted!');
            this.getAllUsers();
          } else {
            this.alertShow.error('Maybe, User Not Found 🔍.')
          }
        });
      } else {
        this.alertShow.info('User is not Deleted!');
      }
    })
  }

  updatePagedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedUsers = this.filteredUsers.slice(start, end);
  }

  totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.isLoading = true;
    this.text = 'Loading...';
    this.updatePagedUsers();

    setTimeout(() => {
      this.isLoading = false;
      this.text = '';
    }, 500);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.isLoading = true;
      this.text = 'Loading...';
      this.updatePagedUsers();

      setTimeout(() => {
        this.isLoading = false;
        this.text = '';
      }, 500);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isLoading = true;
      this.text = 'Loading...';
      this.updatePagedUsers();

      setTimeout(() => {
        this.isLoading = false;
        this.text = '';
      }, 500);
    }
  }
}