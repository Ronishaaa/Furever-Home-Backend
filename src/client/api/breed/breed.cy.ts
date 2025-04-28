describe("Breed Recommendation API", () => {
  const baseUrl = "http://localhost:3001/api";

  it("should recommend dog breeds based on user input", () => {
    const dogInput = {
      grooming: 3,
      shedding: 2,
      energy: 4,
      trainability: 5,
      lifestyle: "active",
      home_type: "house",
      experience_level: "experienced",
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/breed/recommend`,
      body: dogInput,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      if (
        response.body.recommendedBreeds &&
        response.body.recommendedBreeds.length > 0
      ) {
        expect(response.body.recommendedBreeds).to.be.an("array");
        expect(response.body.recommendedBreeds.length).to.be.greaterThan(0);
      } else {
        expect(response.body.recommendedBreeds.message).to.eq(
          "No pets found for the recommended breeds."
        );
      }
    });
  });
});
