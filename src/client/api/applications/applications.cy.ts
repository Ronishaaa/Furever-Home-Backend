describe("Application API", () => {
  const baseUrl = "http://localhost:3001/api";

  // Test for adding an application with valid data
  it("should add an application with valid data", () => {
    const applicationData = {
      firstName: "Ram",
      lastName: "Shrestha",
      email: "ram@gmail.com",
      phoneNumber: "9866554433",
      address: "Nepal",
      householdMembers: "2",
      homeOwnership: true,
      petAllowed: true,
      outdoorArea: true,
      aloneHours: 4,
      otherPetsInfo: "No other pets.",
      neuteredPets: true,
      upcomingEvents: "Family trip next month.",
      applicationStatus: "Pending",
      userId: 21,
      petId: 82,
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/application`,
      body: applicationData,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property(
        "userId",
        applicationData.userId
      );
      expect(response.body.data).to.have.property(
        "petId",
        applicationData.petId
      );
      expect(response.body.data).to.have.property(
        "applicationStatus",
        "Pending"
      );
    });
  });
});
