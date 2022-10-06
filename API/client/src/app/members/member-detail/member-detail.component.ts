import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  members: Member[];
  data : any;
  dataMemeber : Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }]
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    let data = this.members
    if(this.dataMemeber){
      for (var photo of this.dataMemeber.photos) {
        imageUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
        })
        return imageUrls;
    }
  }

  }
  loadMember() {
    this.memberService.getMember(this.router.snapshot.paramMap.get('username')).subscribe(members => {
      this.data = members;
      this.members = members;
      this.dataMemeber = this.data;
      this.galleryImages = this.getImages();
    });
  }
}
