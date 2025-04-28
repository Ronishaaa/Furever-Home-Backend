describe("Application API", () => {
  const baseUrl = "http://localhost:3000/api/application";

  let applicationId: number;

  // Test for getting all applications
  it("should fetch applications list", () => {
    cy.request("GET", `${baseUrl}?skip=0&limit=10`).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.be.an("array");
      if (response.body.data.length > 0) {
        applicationId = response.body.data[0].id;
      }
    });
  });

  // Test for getting application by id
  it("should fetch an application by ID", () => {
    if (!applicationId) {
      cy.log("No applications available to test fetching by ID");
      return;
    }
    cy.request("GET", `${baseUrl}/${applicationId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", applicationId);
    });
  });

  // Test for updating an application
  it("should update an application", () => {
    const updatedApplication = {
      firstName: "UpdatedFirst",
      lastName: "UpdatedLast",
      email: "updatedemail@example.com",
      phoneNumber: "+9779812345678",
      address: "Updated Address",
      householdMembers: "3",
      homeOwnership: true,
      petAllowed: true,
      outdoorArea: true,
      aloneHours: 4,
      otherPetsInfo: "No other pets",
      neuteredPets: true,
      upcomingEvents: "None",
      applicationStatus: "Approved",
      userId: 8,
      petId: 92,
    };

    cy.request({
      method: "PATCH",
      url: `${baseUrl}/${applicationId}`,
      body: updatedApplication,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.application).to.have.property(
        "applicationStatus",
        "Approved"
      );
    });
  });
});
