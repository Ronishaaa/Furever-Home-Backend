describe("Success Stories API", () => {
  const baseUrl = "http://localhost:3001/api";

  // Test for getting all success stories
  it("should fetch all success stories", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/success-stories`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  // Test for getting a single success story by ID
  it("should fetch a success story by ID", () => {
    const storyId = 1;

    cy.request({
      method: "GET",
      url: `${baseUrl}/success-stories/${storyId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", storyId);
    });
  });
});
