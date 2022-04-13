import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Student } from '../student';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentsService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.students = this.studentService.getAll();
  }

  async presentDeleteAlert(student: Student) {
    const alert = await this.alertController.create({
      header: 'Delete this student?',
      subHeader: `${student.firstName} ${student.lastName}`,
      message: 'This operation cannot be undone.',
      buttons: [

        {
          text: 'Delete',
          handler: () => this.deleteStudent(student)
        },

        {
          text: 'Never Mind',
          role: 'cancel'
        }
      ]
    });
    await alert.present();

  }

  async deleteStudent(student: Student) {
    this.students = this.students.filter(x => x.id !== student.id);

    const alert = await this.toastController.create({
      message: `${student.firstName} ${student.lastName} deleted.`,
      position: 'top',
      duration: 3000
    });

    await alert.present();

  }

  async presentActionSheet(student: Student) {
    const actionSheet = await this.actionSheetController.create({
      header: `${student.firstName} ${student.lastName}`,
      buttons: [{
        text: 'Mark Present',
        icon: 'eye',
        handler: () => {
          student.status = 'present';
        }
      },

      {
        text: 'Mark Absent',
        icon: 'eye-off-outline',
        handler: () => {
          student.status = 'absent';
        }
      },

      {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.presentDeleteAlert(student);
        }
      },

      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel Clicked');
        }
      }

      ]//buttons array
    });

    await actionSheet.present();
  }

}
