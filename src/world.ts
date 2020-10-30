// import { CannonJSPlugin } from "babylonjs";

var BABYLON = require('babylonjs');
var GUI = require('babylonjs-gui');
var materials = require('babylonjs-materials');
var CANNON = require('cannon');


export class World{

    public canvas : any;
    public engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    public camera: BABYLON.ArcRotateCamera;
    public sunPosition: BABYLON.Vector3;
    public dirLight: BABYLON.DirectionalLight;
    public worldPhysics: BABYLON.CannonJSPlugin;
    public physicsFrameRate: number;
    public physicsFrameTime: number;
    public physicsMaxPrediction: number;
    public players: Array<any>;
    public cameras: Array<BABYLON.ArcRotateCamera>;

    constructor(){
        const scope = this;

        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.engine.enableOfflineSupport = false;
        BABYLON.Animation.AllowMatricesInterpolation = true;
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
        window.addEventListener("resize", function () {
            scope.engine.resize();
        });



        var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyboxMaterial.backFaceCulling = false;
        // skyboxMaterial.turbidity = 1;
        // skyboxMaterial.luminance = 1;
        skyboxMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
        this.sunPosition = new BABYLON.Vector3(0, 1, 0);
        skyboxMaterial.sunPosition = this.sunPosition;

        //skyboxMaterial._cachedDefines.FOG = true;
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        skybox.material = skyboxMaterial;

        var dirLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, 1, 0), this.scene);
        dirLight.diffuse = new BABYLON.Color3(0, 0, 0);
        this.dirLight = dirLight;

        this.worldPhysics = new BABYLON.CannonJSPlugin.World();
        var gravityVector = new BABYLON.Vector3(0,-9.81, 0);

        scene.enablePhysics(gravityVector, this.worldPhysics);
        this.physicsFrameRate = 60;
        this.physicsFrameTime = 1 / this.physicsFrameRate;
        this.physicsMaxPrediction = this.physicsFrameRate;


        this.players = [];
        this.camera = [];
    }


    update(delta){

    }

}
