// about-us.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  opened: boolean = false;
  viewportState = "" 
  // scrollToSection(sectionId: string): void {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     window.scrollTo({
  //       top: section.offsetTop,
  //       behavior: 'smooth'
  //     });
  //   }
  // }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end', 
        inline: 'nearest' });
    }
  }




  menuToggle(){
    // if(this.viewportState == "mobileOrTablet"){
    //   this.opened=!this.opened
    // }
    // return this.opened
    this.opened = !this.opened;
  }
}
