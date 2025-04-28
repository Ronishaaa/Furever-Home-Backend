describe("Pet API", () => {
  const baseUrl = "http://localhost:3000/api";

  // Test POST request to add a new pet
  it("should add a new pet", () => {
    const newPet = {
      name: "Bunty",
      breed: "Beagle",
      age: 3,
      gender: "Female",
      color: "Tri-color",
      healthCondition: "Healthy",
      vaccination: false,
      adoptionStatus: "Available",
      type: "Dog",
      images: [
        "https://res.cloudinary.com/dbgzu9tau/image/upload/v1737815886/pets/kzdgjbrou5wonc9kuyou.jpg",
      ],
      energyLevel: "Low",
      temperament: "Shy",
      trainingLevel: "Basic",
      personality: ["Shy", "Loyal"],
      adoptionInfo: {
        childrenFriendly: true,
        otherPetsFriendly: true,
        experienceLevel: "FirstTimeOwner",
      },
    };

    cy.request("POST", `${baseUrl}/pets`, newPet).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  //   // Test PATCH request to update a pet's information
  //   it("should update a pet", () => {
  //     const updatedPet = {
  //       name: "Buddy Updated",
  //       breed: "Golden Retriever",
  //       age: 5,
  //       gender: "Male",
  //       vaccination: true,
  //       adoptionStatus: "ADOPTED",
  //       energyLevel: "LOW",
  //       trainingLevel: "ADVANCED",
  //       personality: ["Friendly", "Calm"],
  //     };

  //     cy.request({
  //       method: "PATCH",
  //       url: `${baseUrl}/pets/1`, // Replace 1 with the actual pet ID
  //       body: updatedPet,
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.pet.name).to.eq("Buddy Updated");
  //     });
  //   });

  //   // Test DELETE request to delete a pet
  //   it("should delete a pet", () => {
  //     cy.request({
  //       method: "DELETE",
  //       url: `${baseUrl}/pets/1`, // Replace 1 with the actual pet ID
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.message).to.eq("Successfully deleted");
  //     });
  //   });
});
