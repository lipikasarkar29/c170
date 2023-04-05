AFRAME.registerComponent("create-markers", {
  
  init:async function(){
    var mainscene=document.querySelector("#main-scene")
    var dishes=await this.getDishes()
    dishes.map(dish=>{
      var marker=document.createElement("a-marker")
      marker.setAttribute("id",dish.id)
      marker.setAttribute("type","pattern")
      marker.setAttribute("url",dish.marker_pattern_url)
      marker.setAttribute("cursor",{
        rayOrigin:"mouse"
      })

      marker.setAttribute("markerhandler",{})
      mainscene.appendChild(marker)


      // Adding 3D model to scene
      var model = document.createElement("a-entity");    
     
      model.setAttribute("id", `model-${dish.id}`);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${dish.model_url})`);
      model.setAttribute("gesture-handler", {});
      marker.appendChild(model);

      // Ingredients Container
      var mainPlane = document.createElement("a-plane");
      mainPlane.setAttribute("id", `main-plane-${dish.id}`);
      mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
      mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
      mainPlane.setAttribute("width", 1.7);
      mainPlane.setAttribute("height", 1.5);
      marker.appendChild(mainPlane);
    })
  },
  //function to get the dishes
  getDishes:async function(){
    return await firebase
    .firestore()
    .collection("dishes")
    .get()
    .then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }
  
  });
