import { Scene,Engine, Vector3, MeshBuilder, ShaderMaterial, RawTexture3D, ArcRotateCamera, Color3, StandardMaterial } from "@babylonjs/core";

export class volumeRender{
    constructor(canvas){
      this.engine = new Engine(canvas, true);
      this.scene = this.CreateScene();

      this.engine.runRenderLoop(()=>{
        this.MprMaterial.setArray3('cameraPos', this.camera.position);

        if(!this.scene.paused){
          this.scene.render();
        }
      })
    }

    CreateCamera(){
      var camera = new ArcRotateCamera("Camera", Math.PI/2, -Math.PI/2, 1.4, new Vector3(0.5,0.5,0.5), this.scene);
      camera.lowerAlphaLimit = -1000 
      camera.upperAlphaLimit = 1000
      camera.lowerBetaLimit = -1000 
      camera.upperBetaLimit = 1000
      camera.upperRadiusLimit = 5
      camera.lowerRadiusLimit = 0.02
      camera.minZ = 0.1

      camera.speed = 0.0

      camera.upVector = new Vector3(-1, 0, 0)

      camera.allowUpsideDown = true


      camera.attachControl();
      return camera
    }

    CreateScene() {
      const scene = new Scene(this.engine);
      scene.clearColor = Color3.Black;

      this.camera = this.CreateCamera();
      
      this.redSphere = MeshBuilder.CreateSphere("RedSphere", {segments: 6 , diameter: 0.04}, scene); 
      this.redSphere.position = new Vector3(0.5,0.5,0.5);

      const redSphereMat = new StandardMaterial("redMat", scene);

      redSphereMat.diffuseColor = new Color3(1, 0, 0);
      redSphereMat.specularColor = new Color3(1, 0, 0);
      redSphereMat.emissiveColor = new Color3(1, 0, 0);
      redSphereMat.ambientColor = new Color3(1, 0, 0);
      this.redSphere.material = redSphereMat;

      this.CoronalPlane = MeshBuilder.CreatePlane("Axial", {size: 1 , sideOrientation: 2}, scene); 
      this.CoronalPlane.position = new Vector3(0.5,0.5,0.5);

      this.AxialPlane = MeshBuilder.CreatePlane("Coronal", {size: 1, sideOrientation: 2}, scene); 
      this.AxialPlane.position = new Vector3(0.5,0.5,0.5);
      this.AxialPlane.rotation = new Vector3(0, Math.PI/2, 0);
      
      this.SagitalPlane = MeshBuilder.CreatePlane("Sagital", {size: 1, sideOrientation: 2}, scene); 
      this.SagitalPlane.position = new Vector3(0.5,0.5,0.5);
      this.SagitalPlane.rotation = new Vector3(Math.PI/2, Math.PI/2, 0);
      
      this.MprMaterial = new ShaderMaterial("MPRShader", scene, "./MPR",
      {
          needAlphaBlending: true, 
          needAlphaTesting: true,
          attributes: ["position"],
          uniforms: ["world", "view", "projection"],
          samplers: ["textureSampler"],
      });     
      this.MprMaterial.needDepthPrePass = true;
      return scene 
    }
    
    updateAxialPos(newPlanePos){
      this.AxialPlane.position = new Vector3(newPlanePos, 0.5, 0.5)
      this.redSphere.position = new Vector3(newPlanePos, 
        this.redSphere.position._y
        ,this.redSphere.position._z)
      }
      
      updateCoronalPos(newPlanePos){
        this.CoronalPlane.position = new Vector3(0.5, 0.5, newPlanePos)
        this.redSphere.position = new Vector3(this.redSphere.position._x, 
          this.redSphere.position._y
          ,newPlanePos)
      }
        
        updateSagitalPos(newPlanePos){
          this.SagitalPlane.position = new Vector3(0.5, newPlanePos, 0.5)
          this.redSphere.position = new Vector3(this.redSphere.position._x, 
            newPlanePos
            ,this.redSphere.position._z)
        }

    updateTexture(dataArray){
      var newTex = new RawTexture3D(new Uint8Array(dataArray), 128, 128, 128, Engine.TEXTUREFORMAT_RGB, this.scene)
      this.MprMaterial.setTexture("textureSampler", newTex);
      this.AxialPlane.material = this.MprMaterial;
      this.CoronalPlane.material = this.MprMaterial;
      this.SagitalPlane.material = this.MprMaterial;
    }    
  }