describe("Rescue Stories API", () => {
  const baseUrl = "http://localhost:3000/api";

  // Test for deleting a rescue story
  it("should delete a rescue story", () => {
    const storyId = 4;

    cy.request({
      method: "DELETE",
      url: `${baseUrl}/rescue-stories/${storyId}`,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
