import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';

@IonicPage()
@Component({
  selector: 'page-threejs',
  templateUrl: 'threejs.html',
})
export class ThreejsPage {

  @ViewChild('domObj') canvasEl: ElementRef;

  private _ELEMENT : any;
  private _SCENE;
  private _CAMERA;
  public renderer;
  private _GEOMETRY;
  public _MATERIAL;
  public _CUBE;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad() : void {
    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }
  /**
   * Initialise the WebGL objecty to be generated using
   * selected ThreeJS methods and properties
   *
   * @public
   * @method initialiseWebGLObjectAndEnvironment
   * @return {none}
   */
  initialiseWebGLObjectAndEnvironment() : void
  {

    // Reference the DOM element that the WebGL generated object
    // will be assigned to
    this._ELEMENT 			= this.canvasEl.nativeElement;


    // Define a new ThreeJS scene
    this._SCENE 				= new THREE.Scene();


    // Define a new ThreeJS camera from the following types:
    /*
       1. CubeCamera				(Creates 6 cameras - one for each face of a cube)
       2. OrthographicCamera		(Creates a camera using orthographic projection - object size stays constant
                                   regardless of distance from the camera)
       3. PerspectiveCamera		(Creates a camera using perspective projection - most common projection type
                                   for 3D rendering [designed to mimic the way the human eye sees])
       4. StereoCamera			(Dual PerspectiveCameras - used for 3D effects such as parallax barrier)
    */
    this._CAMERA 				= new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );


    // Define an object to manage display of ThreeJS scene
    this.renderer 			= new THREE.WebGLRenderer();


    // Resizes the output canvas to match the supplied width/height parameters
    this.renderer.setSize( 300, 300);


    // Attach the canvas, where the renderer draws the scene, to the specified DOM element
    this._ELEMENT.appendChild( this.renderer.domElement );


    // BoxGeometry class allows us to create a cube (with width, height and depth dimensions supplied as
    // parameters - default is 1 for these values)
    this._GEOMETRY 			= new THREE.BoxGeometry( 1, 1, 1 );


    // Define the material (and its appearance) for drawing the geometry to the scene
    this._MATERIAL 			= new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe : true } );


    // Use the Mesh class to define a polygon mesh based object with the supplied geometry and material objects
    this._CUBE 				= new THREE.Mesh( this._GEOMETRY, this._MATERIAL );


    // Add the object to the scene
    this._SCENE.add(this._CUBE);


    // Define the depth position of the camera
    this._CAMERA.position.z 	= 3;
  }


  /**
   * Define the animation properties for the WebGL object rendered in the DOM element, using the requestAnimationFrame
   * method to animate the object
   *
   * @private
   * @method animate
   * @return {none}
   */
  private _animate () : void
  {
    requestAnimationFrame(() =>
    {
      this._animate();
    });


    // Define rotation speeds on x and y axes - lower values means lower speeds
    this._CUBE.rotation.x += 0.015;
    this._CUBE.rotation.y += 0.015;


    // Render the scene (will be called using the requestAnimationFrame method to ensure the cube is constantly animated)
    this.renderer.render(this._SCENE, this._CAMERA);
  };

  /**
   * Render the animation
   *
   * @public
   * @method _renderAnimation
   * @return {none}
   */
  renderAnimation() : void
  {
    //if (Detector.webgl)
    //{
    this._animate();
    /*}
    else {
       var warning = Detector.getWebGLErrorMessage();
       console.log(warning);
    }*/
  }

}

