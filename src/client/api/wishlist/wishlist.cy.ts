describe("Wishlist API", () => {
  const baseUrl = "http://localhost:3001/api";

  // Test for adding or updating a wishlist
  it("should add or update a wishlist", () => {
    const userId = 21;
    const data = {
      userId,
      breed: "Golden Retriever",
      ageMin: 1,
      ageMax: 5,
      energyLevel: "Low",
      gender: "Male",
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/wishlist`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property("userId", userId);
      expect(response.body.data).to.have.property("breed", data.breed);
      expect(response.body.data).to.have.property(
        "energyLevel",
        data.energyLevel
      );
    });
  });

  // Test for retrieving a user's wishlist
  it("should retrieve a wishlist for a user", () => {
    const userId = 21;

    cy.request({
      method: "GET",
      url: `${baseUrl}/wishlist/${userId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("userId", userId);
      expect(response.body.data).to.have.property("MatchedPets");
      expect(response.body.data.MatchedPets).to.be.an("array");
    });
  });
});
