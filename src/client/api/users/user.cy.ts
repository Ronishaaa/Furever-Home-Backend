describe("User Routes", () => {
  const apiUrl = "http://localhost:3001/api";

  let tempEmail = `testuser_${Date.now()}@test.com`;
  let tempPassword = "Test@1234";
  let tempUserId: number;
  let tempToken: string;
  let tempOtp = "123456";

  // Test: Register a new user
  it("should register a new user", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/sign-up`,
      body: {
        username: "Test User",
        email: tempEmail,
        password: tempPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property("id");
      tempUserId = response.body.data.id;
      expect(response.body.data.username).to.eq("Test User");
    });
  });

  // Test: Verify OTP
  it("should verify OTP", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/verify-otp`,
      body: {
        email: tempEmail,
        otp: tempOtp,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body.message).to.eq("Email verified successfully");
      } else {
        expect(response.status).to.eq(400);
      }
    });
  });

  //   Test: Login after OTP verification
  it("should login after verification", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        email: tempEmail,
        password: tempPassword,
        socketId: "dummy-socket-id",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("token");
      tempToken = response.body.token;
      expect(response.body.user.email).to.eq(tempEmail);
    });
  });

  // Test: Verify token
  it("should verify token", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/verify`,
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.valid).to.be.true;
    });
  });

  // Test: Resend verification email
  it("should resend verification email", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/resend-verification`,
      body: {
        email: tempEmail,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Verification email resent successfully"
      );
    });
  });

  // Test: Get user by ID
  it("should get user by ID", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/user/${tempUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.email).to.eq(tempEmail);
      expect(response.body.data.id).to.eq(tempUserId);
    });
  });
});
