const { createFacility, getAllFacilities, addFacilities } = require("../services/facilityService");
const { getById } = require("../services/roomService");

const facilityController = require("express").Router();

facilityController.get("/create", (req, res) => {
  res.render("createFacility", {
    title: "Create New Facility",
  });
});


facilityController.post("/create", async (req, res) => {
  console.log("From facilityController.post:", req.body);

  try {
    await createFacility(req.body.label.trim(), req.body.iconUrl.trim());
    res.redirect("/catalog");
    // res.redirect("/facility/create");
  } catch (error) {
    res.render("createFacility", {
      title: "Request Error",
      error,
    });
  }
});


facilityController.get("/:roomId/decorateRoom", async (req, res) => {
  const roomId = req.params.roomId;
  const room = await getById(roomId);
  const facilities = await getAllFacilities();
  // console.log(facilities);

  facilities.forEach(f => {
    // if (room.facilities != undefined){      
      if ((room.facilities || []).some(id => id.toString() == f._id.toString())){
        f.checked = true;
      }
    // }    
  });

  res.render("decorate", {
    title: "Add Facility",
    room,
    facilities,
  });
});


facilityController.post("/:roomId/decorateRoom", async (req, res) => {
  const facilityIds = Object.keys(req.body)
 
  await addFacilities( req.params.roomId, facilityIds)
  
  res.redirect(`/facility/${req.params.roomId}/decorateRoom`);
  
});
    


module.exports = facilityController;
