import { Component, OnInit } from '@angular/core';
// import{} from '../../../assets/images'
@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  public dummy = [
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      createdAt: new Date(),
      sender: {
        firstName: 'Gargi',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/me.jpeg'
      }
    },
    {
      message: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. ',
      createdAt: new Date(),
      sender: {
        firstName: 'Sristi',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/gargi.jpeg'
      }
    },
    {
      message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.',
      createdAt: new Date(),
      sender: {
        firstName: 'Diya',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/image1.jpeg'
      }
    },
    {
      message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
      createdAt: new Date(),
      sender: {
        firstName: 'Rekha',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/me.jpeg'
      }
    },
    {
      message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      createdAt: new Date(),
      sender: {
        firstName: 'Sushma',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/gargi.jpeg'
      }
    },
    {
      message: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',
      createdAt: new Date(),
      sender: {
        firstName: 'Meena',
        lastName: 'Bandyopadhyay',
        photoUrl: '../../../assets/images/image1.jpeg'
      }
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
