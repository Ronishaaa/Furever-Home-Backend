describe("Pets API", () => {
  const baseUrl = "http://localhost:3001/api";

  //   Test for getting a specific pet by ID
  it("should retrieve a pet by its ID", () => {
    const petId = 9;
    cy.request({
      method: "GET",
      url: `${baseUrl}/pets/${petId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.pet).to.have.property("id", petId);
    });
  });

  // Test for retrieving similar pets based on a pet's ID
  it("should retrieve similar pets based on pet ID", () => {
    const petId = 9; // Replace with a valid pet ID
    cy.request({
      method: "GET",
      url: `${baseUrl}/pets/similar/${petId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.pets).to.be.an("array");
      expect(response.body.pets.length).to.be.lessThan(5);
    });
  });
});
