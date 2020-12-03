import { Component, OnInit } from '@angular/core';


interface ILinkItem {
  name: string,
  link: string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {



  public linkItems: ILinkItem[]= [
    {
    name: 'Kleinanzeigen',
    link: '/'
  },
  {
    name: 'AGB',
    link: '/'
  },
  {
    name: 'Kontakt',
    link: '/'
  },
  {
    name: 'Impressum',
    link: '/'
  },
  {
    name: 'Partner',
    link: '/'
  },
  {
    name: 'Datenschutz',
    link: '/'
  },
  {
    name: 'Versand und Zahlung',
    link: '/'
  },
];

  constructor() { }

  ngOnInit() {
  }

}
