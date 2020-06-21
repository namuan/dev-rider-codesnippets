package com.github.namuan.boote2e.steps;

import com.github.namuan.boote2e.HttpBinStub;
import com.github.namuan.boote2e.SpringIntegrationTest;
import io.cucumber.java8.En;
import io.restassured.RestAssured;
import org.springframework.beans.factory.annotation.Value;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.http.HttpStatus.OK;

public class HttpFeatureSteps extends SpringIntegrationTest implements En {

    private HttpBinStub httpBinStub;

    @Value("${httpbin.url}")
    private String httpBinUrl;

    public HttpFeatureSteps() {
        Before(() -> httpBinStub = new HttpBinStub(wireMockServer));

        After(() -> httpBinStub.stop());

        Given("^a request$", () -> {
            requestSpecification = RestAssured.given().baseUri(httpBinUrl);

            if (runningWithDevProfile()) {
                httpBinStub.setupStubForGetRequest();
            }
        });

        When("^it is processed$", () ->
                response = requestSpecification.when().get("/get"));

        Then("^it should response with correct status code$", () -> {
            json = response.then().statusCode(OK.value());
        });

        And("^it should contain the original url$", () -> {
            json.body("url", equalTo("https://httpbin.org/get"));
        });
    }

}
