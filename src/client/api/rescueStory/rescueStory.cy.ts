describe("Rescue Stories API", () => {
  const baseUrl = "http://localhost:3001/api";

  // Test for getting all rescue stories
  it("should fetch all rescue stories", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/rescue-stories`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");
    });
  });

  // Test for getting a single rescue story by ID
  it("should fetch a rescue story by ID", () => {
    const storyId = 1;

    cy.request({
      method: "GET",
      url: `${baseUrl}/rescue-stories/${storyId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", storyId);
    });
  });
});
