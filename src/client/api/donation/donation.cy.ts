describe("Donation API", () => {
  const baseUrl = "http://localhost:3001/api";

  // Test for verifying a donation
  it("should verify a donation and update status", () => {
    const pidx = "DUbTfADfdXcFEc4oX4Z5JY";

    cy.request({
      method: "POST",
      url: `${baseUrl}/donation/verify`,
      body: { pidx },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.be.oneOf(["success", "failed"]);
      expect(response.body.data).to.have.property("transaction_id");
    });
  });
});
