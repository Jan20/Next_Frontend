import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit {

  public myStyle: object = {};
  public myParams: object = {};
  public width: number = 100;
  public height: number = 96;

  ngOnInit() {
  
    this.myStyle = {
    
      'width': '100%',
      'height': 'calc(100% - 64px)',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'padding': 0,
      'margin': 0,
      'background': 'linear-gradient(to right bottom, rgb(100, 218, 163),rgb(194, 200, 104))'
    
    }

    this.myParams = {
    
      particles: {
          "number": {
            "value": 20,
            "density": {
              "enable": false,
              "value_area": 2
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 1,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100

            }
          },
          "opacity": {
            "value": 1,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable_auto": true,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 1,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "right",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
          }
      ,"interactivity": {
        "enable": false,
        "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 800,
          "size": 80,
          "duration": 2,
          "opacity": 0.8,
          "speed": 1
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
      
    }
  }

}
