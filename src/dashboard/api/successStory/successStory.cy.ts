describe("Success Stories API", () => {
  const baseUrl = "http://localhost:3000/api";

  // Test for adding a new success story
  it("should add a new success story", () => {
    const newSuccessStory = {
      title: "A New Beginning",
      description: "A heartwarming tale of adoption.",
      imageUrl: [
        "https://res.cloudinary.com/dbgzu9tau/image/upload/v1737815886/pets/kzdgjbrou5wonc9kuyou.jpg",
      ],
      adoptionDate: "2025-04-28T00:00:00Z",
    };

    cy.request("POST", `${baseUrl}/success-stories`, newSuccessStory).then(
      (response) => {
        expect(response.status).to.eq(201);
      }
    );
  });

  //   // Test for updating a success story
  //   it("should update an existing success story", () => {
  //     const updatedStory = {
  //       title: "A New Beginning - Updated",
  //       description: "An even better heartwarming tale of adoption.",
  //       imageUrl: [
  //         "https://res.cloudinary.com/dbgzu9tau/image/upload/v1737815886/pets/kzdgjbrou5wonc9kuyou.jpg",
  //       ], adoptionDate: "2025-04-28T00:00:00Z"
  //     };
  //     const storyId = 1; // Replace with an actual success story ID

  //     cy.request({
  //       method: "PATCH",
  //       url: `${baseUrl}/success-stories/${storyId}`,
  //       body: updatedStory,
  //     }).then((response) => {
  //       expect(response.status).to.eq(200);
  //       expect(response.body.data).to.have.property(
  //         "title",
  //         "A New Beginning - Updated"
  //       );
  //     });
  //   });

  //   // Test for deleting a success story
  //   it("should delete a success story", () => {
  //     const storyId = 1; // Replace with a valid success story ID

  //     cy.request({
  //       method: "DELETE",
  //       url: `${baseUrl}/success-stories/${storyId}`,
  //     }).then((response) => {
  //       expect(response.status).to.eq(204);
  //     });
  //   });
});
